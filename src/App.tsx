import React from 'react';
import Header from './components/Header';
import ImageContainer from './components/ImageContainer';
import Toolbar from './components/Toolbar';
import { ImageEditorProvider } from './context/ImageEditorContext';

function App() {
  return (
    <ImageEditorProvider>
      <div className="min-h-screen bg-[#121212] text-white flex flex-col">
        <Header />
        <main className="flex flex-1 flex-col md:flex-row overflow-hidden">
          <ImageContainer />
          <Toolbar />
        </main>
      </div>
    </ImageEditorProvider>
  );
}

export default App
