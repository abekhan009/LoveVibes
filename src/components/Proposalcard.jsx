import { useState, useEffect } from 'react';

const ProposalCard = ({ onYesClick }) => {
  const [noClickCount, setNoClickCount] = useState(0);
  const [noButtonPos, setNoButtonPos] = useState(null);
  const [yesButtonScale, setYesButtonScale] = useState(1);
  const [loveMeter, setLoveMeter] = useState(0);
  const [currentEmoji, setCurrentEmoji] = useState('😏');
  const [yesButtonRect, setYesButtonRect] = useState(null);
  const [noButtonColor, setNoButtonColor] = useState('#D3D3D3');
  const [isNoButtonMoving, setIsNoButtonMoving] = useState(false);
  const [blockYesClick, setBlockYesClick] = useState(false);

  const noButtonTexts = [
    { text: "No", emoji: "😏" },
    { text: "Are you sure?", emoji: "🥺" },
    { text: "Think again", emoji: "🤔" },
    { text: "Really?", emoji: "😅" },
    { text: "Nope", emoji: "😆" },
    { text: "Not happening", emoji: "😂" },
    { text: "Try again", emoji: "🙃" },
    { text: "Nice try", emoji: "😎" },
    { text: "Nah", emoji: "😜" },
    { text: "Keep trying", emoji: "🤪" },
    { text: "Still no", emoji: "😝" },
    { text: "Maybe?", emoji: "🥹" },
    { text: "Hmm no", emoji: "🤨" },
    { text: "Definitely not", emoji: "😤" },
    { text: "Never!", emoji: "😈" },
    { text: "In your dreams", emoji: "😴" },
    { text: "Not today", emoji: "🙅" },
    { text: "Catch me if you can", emoji: "🏃" },
    { text: "Too slow", emoji: "⚡" },
    { text: "Almost!", emoji: "🎯" }
  ];

  const noButtonColors = [
    '#FF69B4', // Hot Pink
    '#FF1493', // Deep Pink
    '#FF6B9D', // Bright Pink
    '#C71585', // Medium Violet Red
    '#FF4500', // Orange Red
    '#FF6347', // Tomato
    '#FF7F50', // Coral
    '#FF8C69', // Salmon
    '#DA70D6', // Orchid
    '#BA55D3', // Medium Orchid
    '#9370DB', // Medium Purple
    '#8A2BE2', // Blue Violet
    '#FF1493', // Deep Pink
    '#FF69B4', // Hot Pink
    '#FFB6C1', // Light Pink
  ];

  const funnyMessages = [
    "Oops! The button ran away! 🏃💨",
    "You can't escape love! 😄",
    "The YES button is getting bigger... hint hint! 😉",
    "Just say yes already! 💕",
    "I'll wait forever... ⏰💖",
    "You're making this harder than it needs to be! 😂",
    "The YES button is HUGE now! Take the hint! 💝",
    "Why are you running? 🤷‍♂️",
    "This could be so much easier! 😌",
    "The NO button is playing hide and seek! 🙈",
    "Catch me if you can! 🎪",
    "I'm not giving up on us! 💪💕",
    "Your finger is getting tired, isn't it? 😏",
    "Just click YES and end this! 🎉",
    "The universe wants you to say YES! ✨"
  ];

  // Initialize NO button position on mount
  useEffect(() => {
    setTimeout(() => {
      const yesButton = document.querySelector('.yes-button');
      if (yesButton) {
        const yesRect = yesButton.getBoundingClientRect();
        
        const isMobile = window.innerWidth < 768;
        console.log('=== INITIAL POSITION SETUP ===');
        console.log('isMobile:', isMobile);
        console.log('Screen:', window.innerWidth, 'x', window.innerHeight);
        console.log('YES button rect:', yesRect);
        
        let initialX, initialY;
        
        if (isMobile) {
          console.log('>>> MOBILE: Using random position avoiding YES button <<<');
          
          // On mobile: Use random positioning that avoids YES button
          const padding = 80;
          const yesCenterX = yesRect.left + yesRect.width / 2;
          const yesCenterY = yesRect.top + yesRect.height / 2;
          const safeDistance = 300; // Minimum distance from YES button
          
          let attempts = 0;
          do {
            initialX = Math.random() * (window.innerWidth - padding * 2) + padding;
            initialY = Math.random() * (window.innerHeight - padding * 2) + padding;
            
            const distance = Math.sqrt(
              Math.pow(initialX - yesCenterX, 2) + Math.pow(initialY - yesCenterY, 2)
            );
            
            if (distance > safeDistance) {
              break;
            }
            attempts++;
          } while (attempts < 50);
          
          console.log('Initial mobile position:', initialX, initialY, 'after', attempts, 'attempts');
          
        } else {
          console.log('>>> DESKTOP: Using side position <<<');
          
          // On desktop: position to the right of YES button
          initialX = yesRect.right + 180;
          initialY = yesRect.top + yesRect.height / 2;
          
          // If too close to right edge, position to the left
          if (initialX > window.innerWidth - 150) {
            initialX = yesRect.left - 180;
          }
          
          console.log('Initial desktop position:', initialX, initialY);
        }
        
        setNoButtonPos({
          x: `${initialX}px`,
          y: `${initialY}px`,
        });
      }
    }, 100);
  }, []);

  const isPositionSafe = (x, y, yesRect, currentScale) => {
    if (!yesRect) return true;
    
    const isMobile = window.innerWidth < 768;
    
    // Calculate YES button's actual occupied area with scaling
    const yesWidth = yesRect.width * currentScale;
    const yesHeight = yesRect.height * currentScale;
    const yesCenterX = yesRect.left + yesRect.width / 2;
    const yesCenterY = yesRect.top + yesRect.height / 2;
    
    // Define exclusion zone around YES button
    // This is the area where NO button absolutely cannot spawn
    const exclusionPadding = isMobile ? 250 : 120;
    const exclusionZone = {
      left: yesCenterX - (yesWidth / 2) - exclusionPadding,
      right: yesCenterX + (yesWidth / 2) + exclusionPadding,
      top: yesCenterY - (yesHeight / 2) - exclusionPadding,
      bottom: yesCenterY + (yesHeight / 2) + exclusionPadding,
    };
    
    // NO button size
    const noButtonRadius = isMobile ? 120 : 80;
    
    // Check if NO button would be inside exclusion zone
    const noLeft = x - noButtonRadius;
    const noRight = x + noButtonRadius;
    const noTop = y - noButtonRadius;
    const noBottom = y + noButtonRadius;
    
    // Check for any overlap with exclusion zone
    const overlapsX = !(noRight < exclusionZone.left || noLeft > exclusionZone.right);
    const overlapsY = !(noBottom < exclusionZone.top || noTop > exclusionZone.bottom);
    
    if (overlapsX && overlapsY) {
      return false; // NO button would be in exclusion zone
    }
    
    // Additional distance check for extra safety
    const distance = Math.sqrt(
      Math.pow(x - yesCenterX, 2) + Math.pow(y - yesCenterY, 2)
    );
    
    const minDistance = isMobile ? 500 : 300;
    
    return distance > minDistance;
  };

  const isPositionFarFromPrevious = (x, y, prevPos) => {
    if (!prevPos || !prevPos.x || !prevPos.y) return true;
    
    // Extract numeric values from position strings
    const prevX = parseFloat(prevPos.x);
    const prevY = parseFloat(prevPos.y);
    
    // Require minimum distance from previous position
    const isMobile = window.innerWidth < 768;
    const minDistance = isMobile ? 200 : 250; // Larger distance on mobile
    
    const distance = Math.sqrt(
      Math.pow(x - prevX, 2) + Math.pow(y - prevY, 2)
    );
    
    return distance > minDistance;
  };

  // Check if NO button overlaps with YES button
  const checkOverlap = () => {
    const yesButton = document.querySelector('.yes-button');
    const noButton = document.querySelector('.no-button');
    
    if (!yesButton || !noButton) return false;
    
    const yesRect = yesButton.getBoundingClientRect();
    const noRect = noButton.getBoundingClientRect();
    
    // Check if rectangles overlap
    const overlap = !(
      noRect.right < yesRect.left ||
      noRect.left > yesRect.right ||
      noRect.bottom < yesRect.top ||
      noRect.top > yesRect.bottom
    );
    
    return overlap;
  };

  // Protected YES button click handler
  const handleYesClick = (e) => {
    // Check if NO button is overlapping
    if (checkOverlap() || blockYesClick || isNoButtonMoving) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      console.log('YES click blocked - NO button has priority');
      return;
    }
    
    // Allow YES click
    onYesClick();
  };

  const moveNoButton = (e) => {
    // Don't use preventDefault on touch events (causes passive listener warning)
    if (e.type === 'click' || e.type === 'mouseenter') {
      e.preventDefault();
      e.stopPropagation();
    }
    
    const isMobile = window.innerWidth < 768;
    console.log('=== moveNoButton called ===');
    console.log('Event type:', e.type);
    console.log('isMobile:', isMobile);
    console.log('Screen size:', window.innerWidth, 'x', window.innerHeight);
    
    // Block YES button during movement
    setBlockYesClick(true);
    setIsNoButtonMoving(true);
    
    // Get YES button position
    const yesButton = document.querySelector('.yes-button');
    const yesRect = yesButton ? yesButton.getBoundingClientRect() : null;
    setYesButtonRect(yesRect);
    
    // Store previous position
    const prevPos = noButtonPos;
    
    let randomX, randomY;
    
    // Both mobile and desktop use random positioning with collision avoidance
    console.log('>>> Using random positioning with collision avoidance <<<');
    
    const padding = isMobile ? 80 : 100;
    let attempts = 0;
    const maxAttempts = 50;
    
    do {
      randomX = Math.random() * (window.innerWidth - padding * 2) + padding;
      randomY = Math.random() * (window.innerHeight - padding * 2) + padding;
      attempts++;
      
      if (attempts % 10 === 0) {
        console.log(`Attempt ${attempts}: trying position`, randomX, randomY);
      }
    } while (
      (!isPositionSafe(randomX, randomY, yesRect, yesButtonScale) || 
       !isPositionFarFromPrevious(randomX, randomY, prevPos)) && 
      attempts < maxAttempts
    );
    
    console.log('>>> Final position:', randomX, randomY, 'after', attempts, 'attempts');
    
    setNoButtonPos({
      x: `${randomX}px`,
      y: `${randomY}px`,
    });
    
    // Update emoji, text, and color
    const newCount = noClickCount + 1;
    setNoClickCount(newCount);
    const textIndex = newCount % noButtonTexts.length;
    setCurrentEmoji(noButtonTexts[textIndex].emoji);
    
    // Change button color
    const colorIndex = newCount % noButtonColors.length;
    setNoButtonColor(noButtonColors[colorIndex]);
    
    // Limit YES button growth on mobile
    const maxScale = isMobile ? 2.5 : 4;
    setYesButtonScale(prev => Math.min(prev + 0.15, maxScale));
    
    setLoveMeter(prev => Math.min(prev + 15, 100));
    
    // CRITICAL: Clear blocking flags after animation completes
    const animationDuration = isMobile ? 250 : 400;
    setTimeout(() => {
      setBlockYesClick(false);
      setIsNoButtonMoving(false);
      console.log('Blocking flags cleared');
    }, animationDuration + 50);
  };

  const getCurrentNoText = () => {
    const index = noClickCount % noButtonTexts.length;
    return noButtonTexts[index].text;
  };

  const getFunnyMessage = () => {
    if (noClickCount === 0) return "";
    const index = (noClickCount - 1) % funnyMessages.length;
    return funnyMessages[index];
  };

  const noButtonScale = Math.max(1 - noClickCount * 0.03, 0.7);

  // Don't render NO button until position is calculated
  if (!noButtonPos) {
    return (
      <div className="proposal-container">
        <div className="proposal-card">
          <h1 className="proposal-heading">
            Will You Be My Girlfriend? �
          </h1>
          <p className="proposal-subtext">
            You have only one correct answer 😌
          </p>
          <div className="buttons-container">
            <button
              className="yes-button"
              onClick={handleYesClick}
              onTouchStart={(e) => {
                if (checkOverlap() || blockYesClick || isNoButtonMoving) {
                  e.preventDefault();
                  e.stopPropagation();
                  e.stopImmediatePropagation();
                }
              }}
              style={{ 
                transform: `scale(${yesButtonScale})`,
                transformOrigin: 'center center'
              }}
            >
              <span className="sparkle sparkle-1">✨</span>
              YES! 💗
              <span className="sparkle sparkle-2">✨</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="proposal-container">
      {/* Love Meter */}
      {loveMeter > 0 && (
        <div className="love-meter">
          Love Meter: {loveMeter}% 💕
        </div>
      )}

      {/* Main Card */}
      <div className="proposal-card">
        {/* Heading */}
        <h1 className="proposal-heading">
          Will You Be My Girlfriend? �
        </h1>

        {/* Subtext */}
        <p className="proposal-subtext">
          You have only one correct answer 😌
        </p>

        {/* Buttons Container */}
        <div className="buttons-container">
          {/* YES Button */}
          <button
            className="yes-button"
            onClick={handleYesClick}
            onTouchStart={(e) => {
              if (checkOverlap() || blockYesClick || isNoButtonMoving) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
              }
            }}
            onMouseDown={(e) => {
              if (checkOverlap() || blockYesClick || isNoButtonMoving) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
              }
            }}
            style={{ 
              transform: `scale(${yesButtonScale})`,
              transformOrigin: 'center center',
              pointerEvents: (checkOverlap() || blockYesClick || isNoButtonMoving) ? 'none' : 'auto'
            }}
          >
            <span className="sparkle sparkle-1">✨</span>
            YES! 💗
            <span className="sparkle sparkle-2">✨</span>
          </button>
        </div>

        {/* Funny Messages */}
        {noClickCount > 0 && (
          <p className="funny-message">
            {getFunnyMessage()}
          </p>
        )}
      </div>

      {/* NO Button - Spawns randomly on screen */}
      <button
        className="no-button"
        onMouseEnter={moveNoButton}
        onTouchStart={(e) => {
          // Don't preventDefault on touch events (causes warning)
          moveNoButton(e);
        }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          moveNoButton(e);
        }}
        style={{
          left: noButtonPos.x,
          top: noButtonPos.y,
          transform: `translate(-50%, -50%) scale(${noButtonScale})`,
          backgroundColor: noButtonColor,
          transition: window.innerWidth < 768 
            ? 'all 0.25s ease, background-color 0.3s ease' 
            : 'all 0.4s ease, background-color 0.3s ease',
          touchAction: 'none', // Prevent default touch behaviors
        }}
      >
        {getCurrentNoText()} {currentEmoji}
      </button>
    </div>
  );
};

export default ProposalCard;
