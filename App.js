// App.js
import React, { useState } from 'react';
import Histogram from './Histogram';
import ExportButton from './ExportButton';

function App() {
  const [histogramData, setHistogramData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFetch = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('https://www.terriblytinytales.com/test.txt');
      const text = await response.text();
      const words = text.match(/\b\w+\b/g);

      const frequencies = {};
      words.forEach(word => {
        if (frequencies[word]) {
          frequencies[word]++;
        } else {
          frequencies[word] = 1;
        }
      });

      const sortedData = Object.entries(frequencies)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 20)
        .map(([word, frequency]) => ({ word, frequency }));

      setHistogramData(sortedData);
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  return (
    <div>
      <h1>Word Frequency Counter</h1>
      <button onClick={handleFetch} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Submit'}
      </button>
      {histogramData.length > 0 && <Histogram data={histogramData} />}
      {histogramData.length > 0 && <ExportButton data={histogramData} />}
    </div>
  );
}

export default App;