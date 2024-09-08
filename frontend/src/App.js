import React from 'react';
import InvoiceForm from './components/InvoiceForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Invoice Generator</h1>
      </header>
      <InvoiceForm />
    </div>
  );
}

export default App;
