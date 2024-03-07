// PointOfInterestIcon.js
import React from 'react';

const PointOfInterestIcon = ({ onClick, isLabelVisible, width = '24px', height = '24px', fillColor = 'none', strokeWidth = '2' }) => (
  <svg
    onClick={onClick}
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill={fillColor}
    stroke="gray" // Keep the main icon stroke color
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    style={{ cursor: 'pointer' }}
  >
    {/* Change the stroke of the circle based on isLabelVisible */}
    <circle cx="12" cy="10" r="3" fill="none" stroke={isLabelVisible ? '#4CAF50' : 'gray'} />
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
  </svg>
);

export default PointOfInterestIcon;
