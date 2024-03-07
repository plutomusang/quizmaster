// ColoredTextRenderer.js
import React from 'react';

// Component that parses and renders text with colored sections
const ColoredTextRenderer = ({ text }) => {
  const renderColoredText = (inputText) => {
    const colorTextRegex = /<color:(.*?)>(.*?)<\/color>/gs;
    const parts = [];
    let lastIndex = 0;

    inputText.replace(colorTextRegex, (match, color, content, index) => {
      // Push text before color tag if any
      if (index > lastIndex) {
        parts.push(inputText.slice(lastIndex, index));
      }

      // Push colored span
      parts.push(<span key={index} style={{ color }}>{content}</span>);
      lastIndex = index + match.length;
    });

    // Push remaining text if any
    if (lastIndex < inputText.length) {
      parts.push(inputText.slice(lastIndex));
    }

    return parts;
  };

  return <>{renderColoredText(text)}</>;
};

export default ColoredTextRenderer;
