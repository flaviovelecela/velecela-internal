import React, { useState } from 'react';
import MathQuill, { addStyles as addMathquillStyles, EditableMathField } from 'react-mathquill';
import katex from 'katex';
import 'katex/dist/katex.min.css';

// Initialize MathQuill styles
addMathquillStyles();

const API_URL = process.env.REACT_APP_API_URL || '';

function TestPage() {
  const [expression, setExpression] = useState('');
  const [variable, setVariable] = useState('x');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const cleanExpression = (latex) => {
    // Replace LaTeX syntax with SymPy-compatible syntax
    return latex
      .replace(/\\frac{([^}]*)}{([^}]*)}/g, '($1)/($2)')
      .replace(/\\cdot/g, '*')
      .replace(/\\left/g, '')
      .replace(/\\right/g, '')
      .replace(/\\\(/g, '(')
      .replace(/\\\)/g, ')')
      .replace(/\\,/g, '')
      .replace(/\\ /g, '')
      .replace(/\\{/g, '(')
      .replace(/\\}/g, ')')
      .replace(/\\pi/g, 'pi')
      .replace(/\\sqrt{([^}]*)}/g, 'sqrt($1)')
      .replace(/\^/g, '**')
      .replace(/\s/g, '') // Remove whitespace
      .replace(/([0-9])([a-zA-Z])/g, '$1*$2') // Add multiplication sign between number and variable
      .replace(/([a-zA-Z])([0-9])/g, '$1*$2') // Add multiplication sign between variable and number
      .replace(/([a-zA-Z])([a-zA-Z])/g, '$1*$2'); // Add multiplication sign between variables
  };

  const handleCalculate = () => {
    setIsLoading(true);
    setError(null);
    const cleanedExpression = cleanExpression(expression);
    fetch(`${API_URL}/calculate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ expression: cleanedExpression, variable }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP status ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setResult(data.result);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        if (error.name === 'AbortError') {
          setError('Request was cancelled');
        } else if (error instanceof TypeError) {
          setError(`Network error: ${error.message}`);
        } else {
          setError(`Error fetching data: ${error.message}`);
        }
        setIsLoading(false);
      });
  };

  const renderMath = (latex) => {
    try {
      return { __html: katex.renderToString(latex, { throwOnError: false }) };
    } catch (e) {
      return { __html: `<span class="error">Failed to render LaTeX: ${e.message}</span>` };
    }
  };

  const handleReset = () => {
    setExpression('');
    setVariable('x');
    setResult(null);
    setError(null);
    setIsLoading(false);
  };

  return (
    <div style={{ textAlign: 'center', margin: '50px' }}>
      <h1>Integral Calculator</h1>
      <div style={{ margin: 'auto', maxWidth: '600px' }}>
        <EditableMathField
          latex={expression}
          onChange={(mathField) => setExpression(mathField.latex())}
          style={{ width: '100%', marginBottom: '20px', fontSize: '20px' }}
        />
        <input
          type="text"
          value={variable}
          onChange={(e) => setVariable(e.target.value)}
          placeholder="Variable of integration"
          disabled={isLoading}
          style={{ marginBottom: '20px', fontSize: '20px' }}
        />
        <button onClick={handleCalculate} disabled={isLoading || !expression}>
          {isLoading ? 'Calculating...' : 'Calculate Integral'}
        </button>
        <button onClick={handleReset} style={{ marginLeft: '10px' }} disabled={isLoading}>
          Reset
        </button>
        <p>This is a test page for integral calculations.</p>
        {isLoading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {result && (
          <p>
            Integral Result: <span dangerouslySetInnerHTML={renderMath(result)} />
          </p>
        )}
      </div>
    </div>
  );
}

export default TestPage;
