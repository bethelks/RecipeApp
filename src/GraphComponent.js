import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

function GraphComponent() {
  // Default dataset
  const defaultData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Dataset 1',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
  };

  // State for graph data
  const [graphData, setGraphData] = useState(defaultData);
  const [selectedOption, setSelectedOption] = useState('Option 1');

  // Handles dropdown change
  const handleOptionChange = (event) => {
    const selected = event.target.value;
    setSelectedOption(selected);

    if (selected === 'Option 2') {
      setGraphData({
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Dataset 2',
            backgroundColor: 'rgba(255,99,132,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [10, 20, 30, 40, 50, 60, 70]
          }
        ]
      });
    } else if (selected === 'Option 3') {
      setGraphData({
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Dataset 3',
            backgroundColor: 'rgba(153,102,255,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [5, 15, 25, 35, 45, 55, 65]
          }
        ]
      });
    } else {
      setGraphData(defaultData); // Reset to default
    }
  };

  return (
    <div>
      <h2>Dynamic Graph</h2>
      <select value={selectedOption} onChange={handleOptionChange}>
        <option value="Option 1">Dataset 1</option>
        <option value="Option 2">Dataset 2</option>
        <option value="Option 3">Dataset 3</option>
      </select>
      <Bar data={graphData} />
    </div>
  );
}

export default GraphComponent;