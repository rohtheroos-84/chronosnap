import React, { useRef, useState, useEffect } from 'react';

interface CameraProps {
  onCapture: (imageData: string) => void;
}

const Camera: React.FC<CameraProps> = ({ onCapture }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    startCamera();
    return () => stopCamera();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setError('');
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError('Camera access denied. Please verify your equipment.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(video, 0, 0);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        onCapture(dataUrl);
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          onCapture(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-3xl mx-auto p-2 animate-fade-in">
      {/* Camera Frame (Leather & Brass style) */}
      <div className="relative p-4 bg-stone-800 rounded-lg shadow-2xl border-4 border-double border-amber-700 w-full">
        
        {/* Decorative screws */}
        <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-gradient-to-br from-stone-400 to-stone-600 shadow-inner"></div>
        <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-gradient-to-br from-stone-400 to-stone-600 shadow-inner"></div>
        <div className="absolute bottom-2 left-2 w-3 h-3 rounded-full bg-gradient-to-br from-stone-400 to-stone-600 shadow-inner"></div>
        <div className="absolute bottom-2 right-2 w-3 h-3 rounded-full bg-gradient-to-br from-stone-400 to-stone-600 shadow-inner"></div>

        <div className="relative w-full aspect-[4/3] bg-black rounded-sm overflow-hidden border-2 border-stone-900 shadow-inner group">
            {!stream && !error && (
                <div className="absolute inset-0 flex items-center justify-center text-amber-100/50 font-serif italic">
                    Warming up mechanism...
                </div>
            )}
            
            {error && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-red-300 p-6 text-center font-serif">
                    <p>{error}</p>
                </div>
            )}

            <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`w-full h-full object-cover transform -scale-x-100 sepia-[.3] contrast-[1.1] ${!stream ? 'hidden' : ''}`}
            />
            
            <canvas ref={canvasRef} className="hidden" />
            
            {/* Vintage Viewfinder Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-40">
                <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-white/60"></div>
                <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-white/60"></div>
                <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-white/60"></div>
                <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-white/60"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-white/40">+</div>
            </div>
        </div>
      </div>

      <div className="mt-8 flex gap-8 w-full justify-center items-center">
        {/* Upload Button */}
        <label className="cursor-pointer group flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full border border-stone-400 bg-stone-200 flex items-center justify-center text-stone-600 shadow-sm transition-all group-hover:bg-white group-hover:shadow-md">
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
            </div>
            <span className="text-xs uppercase tracking-widest text-stone-500 font-serif">Import</span>
        </label>

        {/* Shutter Button */}
        <button
          onClick={capturePhoto}
          disabled={!stream}
          className="relative group disabled:opacity-50 disabled:cursor-not-allowed transform transition active:scale-95"
        >
            <div className="w-20 h-20 rounded-full bg-gradient-to-b from-stone-300 to-stone-400 shadow-[0_5px_15px_rgba(0,0,0,0.3)] flex items-center justify-center border border-stone-400 p-1">
                <div className="w-full h-full rounded-full border-2 border-stone-200 bg-gradient-to-br from-red-700 to-red-900 group-hover:from-red-600 group-hover:to-red-800 transition-all flex items-center justify-center shadow-inner">
                    <div className="w-14 h-14 rounded-full border border-red-900/30 bg-white/10 backdrop-blur-sm"></div>
                </div>
            </div>
        </button>

         {/* Restart Camera */}
         <button 
           onClick={() => startCamera()}
           className="cursor-pointer group flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full border border-stone-400 bg-stone-200 flex items-center justify-center text-stone-600 shadow-sm transition-all group-hover:bg-white group-hover:shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
            </div>
            <span className="text-xs uppercase tracking-widest text-stone-500 font-serif">Reset</span>
         </button>
      </div>
    </div>
  );
};

export default Camera;