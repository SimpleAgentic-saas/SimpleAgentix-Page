import React from 'react';

export const BrandLogo: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => (
  <img 
    src="https://i.ibb.co/xS5KNMRb/image.png" 
    alt="SimpleAgentix Logo" 
    className={`${className} object-contain object-center drop-shadow-md`} 
  />
);