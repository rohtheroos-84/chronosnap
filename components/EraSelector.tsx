import React, { useState } from 'react';
import { TIME_ERAS, CUSTOM_ERA } from '../constants';
import { TimeEra, EraCategory } from '../types';

interface EraSelectorProps {
  onSelect: (era: TimeEra, customPrompt?: string) => void;
  selectedEraId?: string;
}

const EraSelector: React.FC<EraSelectorProps> = ({ onSelect, selectedEraId }) => {
  const [activeCategory, setActiveCategory] = useState<EraCategory>('historical');
  const [customText, setCustomText] = useState('');

  const filteredEras = TIME_ERAS.filter(era => era.category === activeCategory);

  const categories: { id: EraCategory; label: string }[] = [
    { id: 'historical', label: 'Time Travel' },
    { id: 'cinematic', label: 'Silver Screen' },
    { id: 'artistic', label: 'Fine Art' },
    { id: 'custom', label: 'Special Request' }
  ];

  const handleCustomSubmit = () => {
    if (customText.trim()) {
        onSelect(CUSTOM_ERA, customText);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-stone-800 font-serif italic mb-2">
            Select Destination
        </h2>
        <div className="h-px w-32 bg-amber-800/30 mx-auto mb-6"></div>
        
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map(cat => (
                <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`
                        px-6 py-2 rounded-full font-serif text-sm tracking-widest uppercase transition-all
                        border border-transparent
                        ${activeCategory === cat.id 
                            ? 'bg-amber-800 text-white shadow-lg' 
                            : 'bg-stone-200 text-stone-600 hover:bg-white hover:border-amber-200 hover:shadow-md'
                        }
                    `}
                >
                    {cat.label}
                </button>
            ))}
        </div>
      </div>
      
      {activeCategory === 'custom' ? (
          <div className="max-w-2xl mx-auto animate-fade-in">
             <div className="bg-[#fffbf0] p-8 border border-stone-300 shadow-xl rounded-sm relative">
                {/* Typewriter Effect Decor */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#fffbf0] px-4 text-stone-400 text-xs tracking-widest uppercase">
                    Communique
                </div>

                <label className="block text-stone-800 font-serif font-bold text-lg mb-4">
                    Describe your vision:
                </label>
                <textarea
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    placeholder="E.g., Turn me into a zombie in a post-apocalyptic mall..."
                    className="w-full h-32 bg-white border border-stone-300 p-4 font-mono text-stone-700 text-lg shadow-inner focus:ring-2 focus:ring-amber-500 outline-none resize-none mb-6"
                />
                
                <button
                    onClick={handleCustomSubmit}
                    disabled={!customText.trim()}
                    className="w-full py-4 bg-stone-800 text-amber-50 font-serif text-xl tracking-wide uppercase hover:bg-stone-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center justify-center gap-2"
                >
                    <span>Send Telegram</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                </button>

                 <div className="mt-4 text-center text-stone-400 text-xs font-serif italic">
                    * The operator will interpret your request with creative license.
                </div>
             </div>
          </div>
      ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in">
            {filteredEras.map((era) => (
            <button
                key={era.id}
                onClick={() => onSelect(era)}
                className={`
                relative group overflow-hidden bg-white
                flex flex-col items-center justify-between
                transition-all duration-300 ease-out
                border border-stone-200 shadow-[2px_2px_10px_rgba(0,0,0,0.05)]
                hover:-translate-y-1 hover:shadow-[5px_5px_15px_rgba(0,0,0,0.1)]
                rounded-sm p-1
                ${selectedEraId === era.id 
                    ? 'ring-2 ring-amber-600 ring-offset-2' 
                    : 'hover:border-amber-200'
                }
                `}
            >
                {/* Vintage Ticket Design */}
                <div className="w-full h-full border border-dashed border-stone-300 p-4 flex flex-col items-center bg-[#fffbf0]">
                    
                    {/* Stamp/Icon Area */}
                    <div className={`
                        w-16 h-16 rounded-full mb-4 flex items-center justify-center text-3xl
                        bg-gradient-to-br ${era.color} text-white shadow-inner
                        opacity-90 group-hover:opacity-100 transition-opacity
                    `}>
                        {era.icon}
                    </div>

                    <div className="text-center z-10">
                        <h3 className="text-stone-900 font-bold font-serif text-lg leading-tight mb-1">{era.title}</h3>
                        <div className="w-8 h-px bg-stone-300 mx-auto mb-2"></div>
                        <p className="text-stone-500 text-xs font-serif italic">{era.description}</p>
                    </div>
                    
                    {/* Decorative corners */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-stone-200"></div>
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-stone-200"></div>
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-stone-200"></div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-stone-200"></div>
                </div>
            </button>
            ))}
        </div>
      )}
    </div>
  );
};

export default EraSelector;