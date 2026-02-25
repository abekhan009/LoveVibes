import { useEffect, useState } from 'react';

const AnimatedHearts = () => {
  const [hearts, setHearts] = useState([]);
  const heartEmojis = ['💕', '💖', '💗', '💓', '💝'];

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const heartCount = isMobile ? 8 : 15;
    
    const newHearts = Array.from({ length: heartCount }, (_, i) => ({
      id: i,
      emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
      left: Math.random() * 100,
      animationDuration: Math.random() * 10 + 10,
      animationDelay: Math.random() * 5,
    }));
    
    setHearts(newHearts);
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="floating-heart"
          style={{
            left: `${heart.left}%`,
            animationDuration: `${heart.animationDuration}s`,
            animationDelay: `${heart.animationDelay}s`,
          }}
        >
          {heart.emoji}
        </div>
      ))}
    </div>
  );
};

export default AnimatedHearts;
