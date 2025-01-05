import React from 'react';
import { Share2 } from 'lucide-react';

interface ShareData {
  title: string;
  text: string;
  url: string;
}

interface Props {
  data: ShareData;
  onShare?: () => void;
}

const ShareButton: React.FC<Props> = ({ data, onShare }) => {
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share(data);
      } else {
        // Fallback for browsers that don't support Web Share API
        const text = `${data.title}\n${data.text}\n${data.url}`;
        await navigator.clipboard.writeText(text);
        alert('Copied to clipboard!');
      }
      onShare?.();
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
    >
      <Share2 className="h-4 w-4" />
      <span>Share Progress</span>
    </button>
  );
};

export default ShareButton;