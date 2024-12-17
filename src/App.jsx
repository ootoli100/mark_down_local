import React, { useState, useCallback, useRef } from 'react';

    function App() {
      const [results, setResults] = useState('');
      const fileInputRef = useRef(null);

      const handleDrop = useCallback((event) => {
        event.preventDefault();
        event.stopPropagation();

        const files = event.dataTransfer.files;
        if (files.length > 0) {
          setResults('File is imported!');
        }
      }, []);

      const handleDragOver = useCallback((event) => {
        event.preventDefault();
        event.stopPropagation();
      }, []);

      const handleFileInputChange = (event) => {
        const files = event.target.files;
         if (files.length > 0) {
          setResults('File is imported!');
        }
      };

      const handleDropZoneClick = () => {
        fileInputRef.current.click();
      };

      const handleCopyClick = async () => {
        if (results) {
          try {
            await navigator.clipboard.writeText(results);
            alert('Text copied to clipboard!');
          } catch (err) {
            console.error('Failed to copy text: ', err);
            alert('Failed to copy text.');
          }
        }
      };

      return (
        <div>
          <h1>Mark It Down</h1>
          <p>投入されたPDFやHTMLをマークダウン化し、ワンクリックでコピーできるようにします</p>
          <div
            className="drop-zone"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={handleDropZoneClick}
          >
            Drag and drop a file here or click to select
          </div>
          <input
            type="file"
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handleFileInputChange}
          />
          <div className="results-zone">
            {results ? <pre>{results}</pre> : 'No file processed yet.'}
            {results && (
              <button className="copy-button" onClick={handleCopyClick}>
                Copy
              </button>
            )}
          </div>
        </div>
      );
    }

    export default App;
