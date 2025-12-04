import React, { useState } from 'react';
import Camera from './components/Camera';
import EraSelector from './components/EraSelector';
import ResultViewer from './components/ResultViewer';
import { generateTimeTravelPhoto } from './services/geminiService';
import { ProcessingState, TimeEra, GeneratedImageResult } from './types';

function App() {
  const [appState, setAppState] = useState<ProcessingState>('camera');
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [selectedEra, setSelectedEra] = useState<TimeEra | null>(null);
  const [result, setResult] = useState<GeneratedImageResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [gallery, setGallery] = useState<GeneratedImageResult[]>([]);

  const handleCapture = (imageData: string) => {
    setSourceImage(imageData);
    setAppState('selecting');
  };

  const handleEraSelect = async (era: TimeEra, customPrompt?: string) => {
    if (!sourceImage) return;

    setSelectedEra(era);
    setAppState('processing');
    setErrorMsg(null);

    try {
      // Use the custom prompt if provided, otherwise use the era's default prompt
      const promptToUse = customPrompt || era.prompt;
      
      const generatedImageUrl = await generateTimeTravelPhoto(sourceImage, promptToUse);
      
      const newResult = {
        imageUrl: generatedImageUrl,
        era: era,
        timestamp: Date.now(),
        originalPrompt: promptToUse
      };

      setResult(newResult);
      setGallery(prev => [newResult, ...prev]);
      setAppState('complete');
    } catch (err: any) {
      console.error(err);
      setErrorMsg("The chronometer has jammed! (Error: " + (err.message || 'Unknown') + ")");
      setAppState('error');
    }
  };

  const resetApp = () => {
    setAppState('camera');
    setSourceImage(null);
    setResult(null);
    setSelectedEra(null);
    setErrorMsg(null);
  };

  const tryAgain = () => {
    setAppState('selecting');
    setErrorMsg(null);
  };

  const loadFromGallery = (item: GeneratedImageResult) => {
      setResult(item);
      setAppState('complete');
      // We don't have the original source for gallery items unless we store it, 
      // but for viewing the result, it's fine. 
      // To re-edit the original, we'd need to store sourceImage in the result type too.
  };

  return (
    <div className="min-h-screen text-stone-800 overflow-x-hidden flex flex-col">
      
      {/* Vintage Header */}
      <header className="pt-8 pb-6 flex flex-col items-center justify-center relative z-50">
        <div className="border-b-2 border-double border-amber-800/30 w-full max-w-4xl absolute top-1/2 -z-10"></div>
        <div className="bg-[#f5f5f0] px-8 py-2 border-2 border-amber-900/10 shadow-sm flex flex-col items-center cursor-pointer" onClick={resetApp}>
             <div className="text-amber-700 tracking-[0.3em] text-xs font-bold uppercase mb-1">Est. 2025</div>
             <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-stone-900 italic" style={{ fontFamily: 'Playfair Display' }}>
                ChronoSnap
            </h1>
            <p className="text-stone-500 text-sm font-serif italic mt-1">The Digital Atelier</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 relative flex-grow flex flex-col justify-center max-w-6xl">
        
        {appState === 'camera' && (
          <div className="space-y-8 text-center animate-fade-in">
            <div className="max-w-xl mx-auto">
                <h2 className="text-3xl font-bold text-stone-800 mb-3">Portrait Sittings</h2>
                <div className="h-1 w-24 bg-amber-700 mx-auto mb-4"></div>
                <p className="text-stone-600 font-serif italic">
                "Please compose yourself before the lens for temporal transcription."
                </p>
            </div>
            <Camera onCapture={handleCapture} />
          </div>
        )}

        {appState === 'selecting' && (
          <div className="animate-fade-in w-full">
             <div className="flex justify-center mb-6">
                <button 
                  onClick={() => setAppState('camera')}
                  className="group flex items-center gap-2 text-stone-500 hover:text-amber-800 transition-colors font-serif italic"
                >
                    <span className="group-hover:-translate-x-1 transition-transform">←</span>
                    Discard & Retake Portrait
                </button>
             </div>
             
             {sourceImage && (
                 <div className="flex justify-center mb-10 relative">
                     {/* Photo Frame Effect */}
                     <div className="p-2 bg-white shadow-xl rotate-2 transform hover:rotate-0 transition-transform duration-500 border border-stone-200">
                        <div className="relative w-28 h-28 overflow-hidden grayscale contrast-125 sepia-[.3]">
                            <img src={sourceImage} alt="Source" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-stone-900/10 pointer-events-none mix-blend-multiply"></div>
                        </div>
                     </div>
                 </div>
             )}
            <EraSelector onSelect={handleEraSelect} />
          </div>
        )}

        {appState === 'processing' && (
          <div className="flex flex-col items-center justify-center space-y-8 animate-pulse py-12">
            <div className="relative w-48 h-48 flex items-center justify-center">
                {/* Vintage Loading Spinner */}
                <div className="absolute inset-0 border-8 border-stone-200 rounded-full"></div>
                <div className="absolute inset-0 border-8 border-t-amber-700 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                
                <span className="text-5xl text-amber-800">
                    {selectedEra?.icon}
                </span>
            </div>
            <div className="text-center space-y-2">
                <h3 className="text-3xl font-bold text-stone-800 font-serif">Developing...</h3>
                <p className="text-amber-800 font-serif italic">Transporting essence to {selectedEra?.title}</p>
                <div className="text-xs tracking-widest text-stone-400 uppercase mt-4">Gemini Chemical Process v2.5</div>
            </div>
          </div>
        )}

        {appState === 'complete' && result && sourceImage && (
          <ResultViewer 
            originalImage={sourceImage}
            result={result}
            onReset={resetApp}
          />
        )}

        {appState === 'error' && (
           <div className="flex flex-col items-center justify-center max-w-lg mx-auto text-center space-y-6 p-10 bg-[#fffdf5] border-2 border-red-900/20 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-red-900/20"></div>
              
              <div className="text-red-800 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16 mx-auto">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                  </svg>
              </div>
              
              <h3 className="text-2xl font-bold text-stone-900 font-serif">Development Failed</h3>
              <p className="text-stone-600 italic font-serif px-6">{errorMsg}</p>
              
              <div className="flex gap-4 pt-4">
                  <button onClick={tryAgain} className="px-6 py-2 bg-amber-800 hover:bg-amber-900 text-white font-serif rounded shadow-md transition-colors">
                      Attempt Again
                  </button>
                  <button onClick={resetApp} className="px-6 py-2 border border-stone-400 hover:bg-stone-100 text-stone-600 font-serif rounded transition-colors">
                      Return Home
                  </button>
              </div>
           </div>
        )}

      </main>

      {/* Gallery Strip */}
      {gallery.length > 0 && (
          <section className="bg-stone-800 py-6 border-t-4 border-amber-900">
              <div className="container mx-auto px-4">
                  <h4 className="text-stone-400 text-xs uppercase tracking-widest mb-4 font-serif text-center">Recent Plates</h4>
                  <div className="flex justify-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
                      {gallery.map((item, idx) => (
                          <button 
                            key={idx}
                            onClick={() => loadFromGallery(item)}
                            className="flex-shrink-0 w-20 h-24 bg-stone-700 p-1 border border-stone-600 hover:border-amber-500 transition-colors relative group"
                          >
                              <img src={item.imageUrl} alt="Thumbnail" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                          </button>
                      ))}
                  </div>
              </div>
          </section>
      )}

      <footer className="text-center py-8 text-stone-400 text-xs tracking-widest uppercase bg-[#f5f5f0] border-t border-stone-200">
          &copy; MMXXV ChronoSnap Photographic Co.
      </footer>

      <style>{`
        @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fade-in 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
      `}</style>
    </div>
  );
}

export default App;