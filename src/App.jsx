import { useState } from 'react';
import AnimatedHearts from './components/AnimatedHearts';
import ProposalCard from './components/Proposalcard';
import SuccessScreen from './components/SuccessScreen';
import './index.css';

function App() {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleYesClick = () => {
    setShowSuccess(true);
  };

  const handlePlayAgain = () => {
    setShowSuccess(false);
  };

  if (showSuccess) {
    return <SuccessScreen onPlayAgain={handlePlayAgain} />;
  }

  return (
    <div className="app-container">
      {/* Background Blur Circles */}
      <div className="blur-circle blur-circle-1"></div>
      <div className="blur-circle blur-circle-2"></div>
      <div className="blur-circle blur-circle-3"></div>

      {/* Floating Hearts */}
      <AnimatedHearts />

      {/* Main Proposal Card */}
      <ProposalCard onYesClick={handleYesClick} />
    </div>
  );
}

export default App;
