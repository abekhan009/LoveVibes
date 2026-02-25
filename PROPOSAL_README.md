# 💍 Romantic Marriage Proposal App 💕

A beautiful, romantic, and funny single-page React application for a marriage/love proposal!

## ✨ Features

### 🎨 Beautiful Design
- Soft pink romantic gradient background
- Floating animated hearts
- Glowing blur circles
- Smooth animations with Framer Motion

### 💗 Interactive Elements
- **YES Button**: 
  - Grows bigger each time NO is clicked
  - Sparkles animation
  - Glow effect on hover
  - Triggers confetti celebration

- **NO Button** (Funny Logic):
  - Moves to random positions when hovered
  - Shrinks with each click
  - Changes text progressively:
    - "No 😏"
    - "Are you sure? 🥺"
    - "Think again 😏"
    - "I will keep asking 😆"
    - "Nice try 😂"
  - Eventually disappears completely

### 📊 Love Meter
- Increases each time NO button is clicked
- Shows progress from 0% to 100%

### 🎉 Success Screen
- Full-screen celebration with confetti
- Animated hearts explosion
- Romantic messages
- Couple silhouette animation
- "Forever Starts Now ❤️" message

## 🚀 How to Run

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and visit the URL shown in the terminal (usually `http://localhost:5173`)

## 🎯 Customization Ideas

### Change the Name
Edit `src/components/ProposalCard.jsx` line 62:
```jsx
Will You Marry Me? 💍
```
Change to:
```jsx
[Name], Will You Marry Me? 💍
```

### Add Background Music
Add an audio file to the `public` folder and update `src/components/SuccessScreen.jsx`:
```jsx
useEffect(() => {
  const audio = new Audio('/your-song.mp3');
  audio.play();
}, []);
```

### Change Colors
Edit `tailwind.config.js` to customize the color palette.

## 📱 Mobile Responsive
Fully optimized for mobile devices with responsive design!

## 🛠️ Built With
- React 19
- Tailwind CSS
- Framer Motion
- Canvas Confetti
- Vite

## 💝 Perfect For
- Marriage proposals
- Love confessions
- Valentine's Day surprises
- Anniversary celebrations

---

Made with 💕 for that special someone!
