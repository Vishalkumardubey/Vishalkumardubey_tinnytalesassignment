// ExportButton.js
import React from 'react';

function ExportButton({ data }) {
  const csvData = data.map(({ word, frequency }) => `${word},${frequency}`).join('\n');
  const csvBlob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
  const csvUrl = URL.createObjectURL(csvBlob);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = csvUrl;
    link.setAttribute('download', 'histogram.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <button onClick={handleDownload}>Export</button>
    </div>
  );
}

export default ExportButton;