import { useEffect } from 'react';

const SuccessScreen = ({ onPlayAgain }) => {
  useEffect(() => {
    // Simple confetti effect using canvas
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '999';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confetti = [];
    const colors = ['#FFD1DC', '#FFB6C1', '#FF69B4', '#FF1493', '#FFC0CB'];

    for (let i = 0; i < 100; i++) {
      confetti.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        r: Math.random() * 6 + 4,
        d: Math.random() * 10 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.random() * 10 - 10,
        tiltAngleIncremental: Math.random() * 0.07 + 0.05,
        tiltAngle: 0,
      });
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      confetti.forEach((c, i) => {
        ctx.beginPath();
        ctx.lineWidth = c.r / 2;
        ctx.strokeStyle = c.color;
        ctx.moveTo(c.x + c.tilt + c.r, c.y);
        ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r);
        ctx.stroke();

        c.tiltAngle += c.tiltAngleIncremental;
        c.y += (Math.cos(c.d) + 3 + c.r / 2) / 2;
        c.x += Math.sin(c.d);
        c.tilt = Math.sin(c.tiltAngle - i / 3) * 15;

        if (c.y > canvas.height) {
          confetti[i] = {
            x: Math.random() * canvas.width,
            y: -20,
            r: c.r,
            d: c.d,
            color: c.color,
            tilt: c.tilt,
            tiltAngleIncremental: c.tiltAngleIncremental,
            tiltAngle: c.tiltAngle,
          };
        }
      });

      requestAnimationFrame(draw);
    }

    draw();

    return () => {
      document.body.removeChild(canvas);
    };
  }, []);

  return (
    <div className="success-screen">
      {/* Floating Hearts Background */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', opacity: 0.3 }}>
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="floating-heart"
            style={{
              left: `${Math.random() * 100}%`,
              fontSize: '3rem',
              animationDuration: `${Math.random() * 5 + 5}s`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          >
            💕
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="success-content">
        {/* Ring Animation */}
        <div className="success-ring">💍</div>

        {/* Main Message */}
        <h1 className="success-heading">Finally! She Said YES! 😏</h1>

        <p className="success-subtext">Took you long enough! 🙄✨</p>

        {/* Couple Silhouette */}
        <div className="success-couple">👫</div>

        <p className="success-forever">I Always Win! 😎💪</p>

        {/* Sarcastic Message Box */}
        <div className="taunting-message">
          <p style={{ fontSize: '1.3em', marginBottom: '10px' }}>
            "NO" Doesn't Work Here! 🚫😂
          </p>
          <p style={{ fontSize: '0.95em', opacity: 0.95 }}>
            You tried to escape, but I knew you'd come around! 😌
          </p>
        </div>

        {/* Floating Sarcastic Emojis */}
        <div className="floating-hearts-success">
          <span>😏</span>
          <span>😎</span>
          <span>🤪</span>
          <span>😜</span>
        </div>

        {/* Music Note */}
        <p className="music-note">🎵 Victory Song Playing 🎵</p>

        {/* Play Again Button */}
        <button className="play-again-button" onClick={onPlayAgain}>
          Try Saying NO Again? 😂
        </button>
      </div>
    </div>
  );
};

export default SuccessScreen;
