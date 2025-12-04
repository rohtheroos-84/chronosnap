<div align="center">

# 📸 ChronoSnap: Time Travel Booth

**Transform your photos across time, art, and imagination using Google's Gemini 2.5 Flash Image AI**

[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?logo=vite)](https://vitejs.dev/)
[![Gemini AI](https://img.shields.io/badge/Gemini-2.5%20Flash-4285F4?logo=google)](https://ai.google.dev/)

</div>

---

## ✨ Features

ChronoSnap is an AI-powered photo transformation app that reimagines your portraits through different historical eras, cinematic styles, and artistic movements.

### 🎭 Available Transformations

**Historical Eras:**
- 👑 Ancient Egypt - Pharaohs & Gold
- ⚔️ Viking Age - Warriors of the North
- 🎷 Roaring 20s - Jazz & Gatsby
- 🍰 French Aristocracy - Marie Antoinette Era
- 👺 Feudal Japan - Way of the Samurai
- 🤠 Wild West - Gunslingers

**Cinematic Styles:**
- 🤖 Cyberpunk 2099 - Neon Future
- 🕵️ Film Noir - The Detective
- 🏨 Symmetrical - Pastel Indie (Wes Anderson)
- 🕹️ Retro Arcade - Synthwave Glow
- 🚀 Space Odyssey - Sci-Fi Epic

**Artistic Styles:**
- 🎨 Oil Portrait - Classical Masterpiece
- 🥫 Pop Art - Warhol Style
- ✏️ Charcoal Sketch - Hand Drawn
- 🏛️ Marble Statue - Greek God

**Custom Mode:**
- ✨ Special Commission - Your Imagination (Custom Prompts)

### 🎨 Key Features

- **Real-time Camera Capture** or **File Upload** support
- **20+ Pre-configured Styles** with optimized prompts
- **Custom Prompt Mode** for unlimited creativity
- **Image Gallery** to browse and compare transformations
- **Post-Processing Controls** (brightness, contrast, saturation, filters)
- **Vintage UI Design** with sepia tones and film-grain aesthetic
- **Responsive Design** works on desktop and mobile

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher recommended)
- **Gemini API Key** from [Google AI Studio](https://ai.google.dev/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/rohtheroos-84/chronosnap.git
   cd chronosnap
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure your API key:**
   
   Create a `.env.local` file in the root directory:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```
   
   > 💡 **Get your API key:** Visit [Google AI Studio](https://ai.google.dev/) to create a free API key for Gemini.

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   ```
   http://localhost:3000
   ```

---

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on `http://localhost:3000` |
| `npm run build` | Build production bundle to `dist/` |
| `npm run preview` | Preview production build locally |

---

## 📁 Project Structure

```
chronosnap/
├── components/
│   ├── Camera.tsx          # Webcam capture & file upload
│   ├── EraSelector.tsx     # Time period/style selection UI
│   └── ResultViewer.tsx    # Image display & post-processing
├── services/
│   └── geminiService.ts    # Gemini API integration
├── App.tsx                 # Main application orchestration
├── constants.ts            # Time era definitions & prompts
├── types.ts                # TypeScript type definitions
├── index.tsx               # React entry point
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies & scripts
```

---

## 🧠 How It Works

1. **Capture Phase:** Users take a photo via webcam or upload an image
2. **Selection Phase:** Choose from 20+ pre-configured styles or enter a custom prompt
3. **Processing Phase:** Image + prompt sent to Gemini 2.5 Flash Image model
4. **Result Phase:** View transformed image with post-processing controls
5. **Gallery:** Browse and revisit previous transformations

### Technical Flow

```typescript
Camera → Base64 Image → Era Selection → Gemini API → Transformed Image → Post-Processing
```

The [`geminiService.ts`](services/geminiService.ts) handles:
- API authentication
- Image encoding (Base64)
- Prompt construction
- Response parsing
- Error handling

---

## 🎯 Technologies Used

### Core Stack
- **React 19.2** - UI framework
- **TypeScript 5.8** - Type safety
- **Vite 6.2** - Build tool & dev server

### AI & APIs
- **Google Gemini 2.5 Flash Image** - AI image transformation
- **@google/genai SDK** - Official Gemini client

### Styling
- **Tailwind CSS** (CDN) - Utility-first styling
- **Custom Fonts:** Lora, Playfair Display
- **Vintage Design System** with sepia/film-grain effects

---

## 🔑 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | ✅ Yes | Your Gemini API key from Google AI Studio |

The Vite config exposes this as `process.env.API_KEY` to the application.

---

## 🎨 Customization

### Adding New Time Eras

Edit [`constants.ts`](constants.ts):

```typescript
export const TIME_ERAS: TimeEra[] = [
  {
    id: 'your-era-id',
    title: 'Your Era Title',
    description: 'Brief description',
    prompt: `Detailed transformation prompt. ${BASE_INSTRUCTION}`,
    icon: '🎭',
    color: 'from-color-500 to-color-900',
    category: 'historical' // or 'cinematic', 'artistic'
  },
  // ... existing eras
];
```

### Modifying Prompts

Each era's `prompt` field controls the AI transformation. The `BASE_INSTRUCTION` ensures consistent quality:

```typescript
const BASE_INSTRUCTION = "Ensure the facial features and expression remain recognizable but blend them perfectly into the target style. High resolution, photorealistic or style-appropriate output.";
```

---

## 🌐 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production bundle in the `dist/` directory.

### Deploy to Vercel/Netlify

1. Connect your GitHub repository
2. Set environment variable: `GEMINI_API_KEY`
3. Build command: `npm run build`
4. Output directory: `dist`

### Deploy to GitHub Pages

```bash
npm run build
# Upload dist/ to gh-pages branch
```

---

## 🐛 Troubleshooting

### "API Key is missing" Error
- Ensure `.env.local` exists with `GEMINI_API_KEY=your_key`
- Restart the dev server after adding the key

### Camera Not Working
- Grant browser camera permissions
- Try file upload as alternative

### Build Errors
- Delete `node_modules` and run `npm install` again
- Check Node.js version (v16+ required)

### Image Generation Fails
- Verify API key is valid
- Check Google AI Studio quota limits
- Ensure image is under 4MB

---

## 📄 License

This project was created with Google AI Studio and is available for personal and educational use.

---

## 🙏 Acknowledgments

- **Google Gemini Team** for the powerful 2.5 Flash Image model
- **AI Studio** for the initial project scaffolding
- **Tailwind CSS** for rapid styling
- **Vite** for lightning-fast development

---

## 🔗 Links

- **AI Studio App:** https://ai.studio/apps/drive/1dJxT4q49VRUsCgii4T2HWbUO8QXENuRX
- **Google Gemini Docs:** https://ai.google.dev/
- **Repository:** https://github.com/rohtheroos-84/chronosnap

---

<div align="center">

**Transform your moments across time** ⏳

</div>
