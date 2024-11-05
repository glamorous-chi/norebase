import React from 'react';

const Loading = () => {
  return (
    <div className="flex space-x-2 justify-center items-center h-screen">
      <div className="w-3 h-3 bg-black rounded-full animate-bounceY" style={{ animationDelay: '0s' }}></div>
      <div className="w-3 h-3 bg-black rounded-full animate-bounceY" style={{ animationDelay: '0.2s' }}></div>
      <div className="w-3 h-3 bg-black rounded-full animate-bounceY" style={{ animationDelay: '0.4s' }}></div>
    </div>
  );
};

export default Loading;
