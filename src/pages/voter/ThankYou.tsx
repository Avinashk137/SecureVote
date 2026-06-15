import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Share2, Download, Home } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const ThankYou = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { electionName, timestamp, refNumber } = location.state || {
    electionName: 'Election',
    timestamp: new Date().toLocaleString(),
    refNumber: "SV-" + Math.random().toString(36).substr(2, 9).toUpperCase()
  };

  const handleDownload = () => {
    window.print();
  };

  const handleShare = async () => {
    const shareText = `I just securely cast my vote for ${electionName}!\nReceipt No: ${refNumber}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Vote Receipt',
          text: shareText,
          url: window.location.origin
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Receipt copied to clipboard! You can now paste and share it.');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 print:bg-white print:text-black">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-md w-full text-center"
      >
        <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 size={48} />
        </div>
        <h1 className="text-4xl font-bold mb-4 tracking-tight print:text-black">Vote Recorded Successfully</h1>
        <p className="text-muted-foreground mb-12 print:text-gray-600">
          Thank you for participating in the {electionName}. Your voice has been heard.
        </p>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-8 text-left space-y-4 print:border-black/20 print:bg-transparent print:text-black">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground print:text-gray-600">Election Name</span>
            <span className="font-bold print:text-black">{electionName}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground print:text-gray-600">Timestamp</span>
            <span className="font-bold print:text-black">{timestamp}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground print:text-gray-600">Reference No.</span>
            <span className="font-mono text-primary print:text-black">{refNumber}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8 print:hidden">
          <button onClick={handleDownload} className="flex items-center justify-center gap-2 bg-white/5 py-3 rounded-xl text-sm font-bold hover:bg-white/10 transition-all">
            <Download size={16} /> Receipt
          </button>
          <button onClick={handleShare} className="flex items-center justify-center gap-2 bg-white/5 py-3 rounded-xl text-sm font-bold hover:bg-white/10 transition-all">
            <Share2 size={16} /> Share
          </button>
        </div>

        <button 
          onClick={() => navigate('/')}
          className="flex items-center justify-center gap-2 text-muted-foreground hover:text-white transition-colors mx-auto print:hidden"
        >
          <Home size={18} /> Back to Home
        </button>
      </motion.div>
    </div>
  );
};

export default ThankYou;
