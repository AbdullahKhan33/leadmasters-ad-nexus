
import React from 'react';

export const Logo = ({ className = "w-10 h-10" }: { className?: string }) => {
  return (
    <div className={`${className} relative`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0066FF" />
            <stop offset="50%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
        </defs>
        
        {/* L shape */}
        <path
          d="M15 15 L15 75 L35 75 L35 85 L5 85 L5 15 Z"
          fill="url(#logoGradient)"
        />
        
        {/* M shape with star */}
        <path
          d="M45 85 L45 35 L55 50 L65 35 L65 85 L75 85 L75 25 L55 45 L35 25 L35 85 Z"
          fill="url(#logoGradient)"
        />
        
        {/* Diamond star */}
        <path
          d="M55 5 L60 20 L75 25 L60 30 L55 45 L50 30 L35 25 L50 20 Z"
          fill="url(#logoGradient)"
        />
      </svg>
    </div>
  );
};
