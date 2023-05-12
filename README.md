# Vishalkumardubey_tinnytalesassignment
I have hosted this application on netlify ( https://tinnytalesassignment.netlify.app/ )
# Getting Started with Create React App

## Available Scripts

In the project directory, you can run:

### `npm start`

SubmitButton.js

Create a component for the Submit button that sends an HTTP GET request to https://www.terriblytinytales.com/test.txt to retrieve the contents of the file.
// SubmitButton.js
import React from 'react';

function SubmitButton({ onClick, disabled, isLoading }) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {isLoading ? 'Loading...' : 'Submit'}
    </button>
  );
}

export default SubmitButton;

Histogram.js

Create a component for the histogram chart.

import React, { useRef, useEffect } from "react";
import { Chart } from 'chart.js/auto';


const Histogram = ({ data }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let chart = null;

    if (chart !== null) {
      chart.destroy();
    }

    chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: data.labels,
        datasets: [
          {
            label: "Frequency",
            data: data.values,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          xAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, [data]);

  return <canvas id="histogram-canvas" ref={canvasRef} />;
};

export default Histogram;


ExportButton.js

Create a component for the Export button that downloads a CSV file of the histogram data.
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

App.js

The App component uses the useState hook to keep track of the histogram data and the loading state. When the user clicks on the "Submit" button, the handleFetch function fetches the text file, extracts the words, and computes their frequencies. Then, the 20 most frequent words are sorted and stored in the histogramData state. The Histogram and ExportButton components are only rendered if there is data to display.

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
