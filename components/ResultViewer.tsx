import React, { useState } from 'react';
import { GeneratedImageResult } from '../types';

interface ResultViewerProps {
  originalImage: string;
  result: GeneratedImageResult;
  onReset: () => void;
}

const ResultViewer: React.FC<ResultViewerProps> = ({ originalImage, result, onReset }) => {
  const [viewMode, setViewMode] = useState<'split' | 'compare'>('split');
  const [sliderPos, setSliderPos] = useState(50);
  
  // Post-processing state
  const [sepia, setSepia] = useState(0);
  const [contrast, setContrast] = useState(100);
  const [brightness, setBrightness] = useState(100);
  const [grain, setGrain] = useState(false);

  const downloadImage = () => {
    // Note: This downloads the raw image from URL, filters are CSS only currently.
    // In a production app, you'd draw the filters to a canvas before download.
    const link = document.createElement('a');
    link.href = result.imageUrl;
    link.download = `chronosnap-${result.era.id}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filterStyle = {
      filter: `sepia(${sepia}%) contrast(${contrast}%) brightness(${brightness}%)`
  };

  return (
    <div className="flex flex-col items-center w-full max-w-6xl mx-auto animate-fade-in-up pb-12">
        
        <div className="grid md:grid-cols-[1fr_300px] gap-8 w-full">
            
            {/* Left Column: Image Viewer */}
            <div className="flex flex-col items-center">
                <div className="text-center mb-6">
                    <div className="inline-block border-b-2 border-amber-700/50 pb-1 mb-2">
                        <h2 className="text-3xl font-bold text-stone-900 font-serif">
                            {result.era.title}
                        </h2>
                    </div>
                    <p className="text-stone-500 italic font-serif text-sm">Development Complete</p>
                </div>

                <div className="flex gap-4 mb-6">
                    <button 
                        onClick={() => setViewMode('split')}
                        className={`px-4 py-2 text-xs uppercase tracking-widest transition-all border-b-2 ${viewMode === 'split' ? 'border-amber-700 text-stone-900 font-bold' : 'border-transparent text-stone-400 hover:text-stone-600'}`}
                    >
                        Side by Side
                    </button>
                    <button 
                        onClick={() => setViewMode('compare')}
                        className={`px-4 py-2 text-xs uppercase tracking-widest transition-all border-b-2 ${viewMode === 'compare' ? 'border-amber-700 text-stone-900 font-bold' : 'border-transparent text-stone-400 hover:text-stone-600'}`}
                    >
                        Revealer
                    </button>
                </div>

                <div className="w-full relative">
                    {viewMode === 'split' ? (
                        <div className="flex flex-col md:flex-row justify-center gap-6">
                            {/* Original Photo - Polarod Style */}
                            <div className="bg-white p-3 pb-8 shadow-xl rotate-[-1deg] border border-stone-200 transform hover:scale-[1.02] transition-transform duration-500 w-full max-w-sm">
                                <div className="aspect-[4/5] bg-stone-100 overflow-hidden filter grayscale contrast-125 sepia-[.2]">
                                    <img src={originalImage} alt="Original" className="w-full h-full object-cover opacity-90" />
                                </div>
                                <div className="mt-3 text-center font-handwriting text-stone-400 font-serif italic text-xs">Reference</div>
                            </div>

                            {/* Result Photo - Framed Style */}
                            <div className="relative bg-white p-4 shadow-2xl rotate-[1deg] border-[8px] border-stone-800 transform hover:scale-[1.02] transition-transform duration-500 w-full max-w-sm">
                                <div className="aspect-[4/5] bg-stone-900 overflow-hidden shadow-inner relative">
                                    <img 
                                        src={result.imageUrl} 
                                        alt="Generated" 
                                        className="w-full h-full object-cover transition-all duration-200" 
                                        style={filterStyle}
                                    />
                                    {grain && (
                                        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
                                    )}
                                </div>
                                <div className="mt-2 text-center">
                                    <span className="text-stone-400 text-[10px] tracking-[0.2em] uppercase">Figure 1.A</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="relative w-full max-w-2xl mx-auto aspect-[4/5] md:aspect-[3/2] cursor-col-resize select-none overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.2)] border-[8px] border-white bg-white"
                            onMouseMove={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
                                setSliderPos((x / rect.width) * 100);
                            }}
                            onTouchMove={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
                                setSliderPos((x / rect.width) * 100);
                            }}
                        >
                            <img src={originalImage} alt="Original" className="absolute inset-0 w-full h-full object-cover filter grayscale sepia-[0.3]" />
                            <div 
                                className="absolute inset-0 overflow-hidden"
                                style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                            >
                                <img 
                                    src={result.imageUrl} 
                                    alt="Result" 
                                    className="absolute inset-0 w-full h-full object-cover" 
                                    style={filterStyle}
                                />
                                 {grain && (
                                    <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
                                )}
                            </div>
                            <div 
                                className="absolute top-0 bottom-0 w-0.5 bg-amber-200/50 shadow-[0_0_10px_rgba(0,0,0,0.3)] z-20"
                                style={{ left: `${sliderPos}%` }}
                            >
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-amber-100 rounded-full shadow-lg flex items-center justify-center border-2 border-white text-amber-900">
                                    ↔
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Right Column: Darkroom Controls */}
            <div className="bg-stone-800 text-stone-300 p-6 rounded-sm shadow-2xl border border-stone-700 h-fit">
                <h3 className="text-xl font-serif text-amber-500 mb-6 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                    </svg>
                    The Darkroom
                </h3>

                <div className="space-y-6">
                    <div>
                        <div className="flex justify-between text-xs uppercase tracking-wider mb-2 text-stone-500">
                            <span>Exposure</span>
                            <span>{brightness}%</span>
                        </div>
                        <input 
                            type="range" min="50" max="150" value={brightness} 
                            onChange={(e) => setBrightness(parseInt(e.target.value))}
                            className="w-full accent-amber-600 h-1 bg-stone-600 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>

                    <div>
                        <div className="flex justify-between text-xs uppercase tracking-wider mb-2 text-stone-500">
                            <span>Contrast</span>
                            <span>{contrast}%</span>
                        </div>
                        <input 
                            type="range" min="50" max="150" value={contrast} 
                            onChange={(e) => setContrast(parseInt(e.target.value))}
                            className="w-full accent-amber-600 h-1 bg-stone-600 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>

                    <div>
                        <div className="flex justify-between text-xs uppercase tracking-wider mb-2 text-stone-500">
                            <span>Sepia Tone</span>
                            <span>{sepia}%</span>
                        </div>
                        <input 
                            type="range" min="0" max="100" value={sepia} 
                            onChange={(e) => setSepia(parseInt(e.target.value))}
                            className="w-full accent-amber-600 h-1 bg-stone-600 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-stone-700">
                        <span className="text-sm font-serif">Film Grain</span>
                        <button 
                            onClick={() => setGrain(!grain)}
                            className={`w-12 h-6 rounded-full relative transition-colors ${grain ? 'bg-amber-700' : 'bg-stone-600'}`}
                        >
                            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${grain ? 'left-7' : 'left-1'}`}></div>
                        </button>
                    </div>

                    <div className="pt-6 space-y-3">
                         <button
                            onClick={downloadImage}
                            className="w-full py-3 bg-amber-700 hover:bg-amber-600 text-white font-serif tracking-wide rounded shadow-md transition-colors flex items-center justify-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                            </svg>
                            Export Plate
                        </button>
                        <button
                            onClick={onReset}
                            className="w-full py-3 bg-stone-700 hover:bg-stone-600 text-stone-300 font-serif rounded transition-colors"
                        >
                            New Session
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ResultViewer;