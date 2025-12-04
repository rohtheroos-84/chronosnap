export type EraCategory = 'historical' | 'cinematic' | 'artistic' | 'custom';

export interface TimeEra {
  id: string;
  title: string;
  description: string;
  prompt: string;
  icon: string;
  color: string;
  category: EraCategory;
}

export interface GeneratedImageResult {
  imageUrl: string;
  era: TimeEra;
  timestamp: number;
  originalPrompt: string;
}

export type ProcessingState = 'idle' | 'camera' | 'selecting' | 'processing' | 'complete' | 'error';