import React from 'react';
import styled from 'styled-components';

// Assuming CodeBlock is a styled component that styles your code blocks
const CodeBlock = styled.pre`
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  color: #666;
  page-break-inside: avoid;
  font-family: monospace;
  font-size: 15px;
  line-height: 1.6;
  margin-bottom: 1.6em;
  max-width: 100%;
  overflow: auto;
  padding: 1em 1.5em;
  display: block;
  word-wrap: break-word;
  font-weight: normal; /* This ensures the font is not bold */
  border-radius: 5px; /* Rounded corners */
`;

const ContentFormatter = ({ text }) => {
  const codeBlockRegex = /<codeblock>(.*?)<\/codeblock>/gs;
  let parts = text.split(codeBlockRegex); // Splitting by regex to capture text inside codeblock tags

  return parts.map((part, index) => {
    if (index % 2 === 0) { // Non-codeblock text
      return part.split('\n').map((line, lineIndex) => (
        <React.Fragment key={`${index}-${lineIndex}`}>
          {line}
          <br />
        </React.Fragment>
      ));
    } else { // Codeblock text
      // Handling \n inside codeblocks correctly
      return <CodeBlock key={index}>{part.split('\n').map((line, lineIndex) => <React.Fragment key={lineIndex}>{line}<br/></React.Fragment>)}</CodeBlock>;
    }
  });
};

export default ContentFormatter;
