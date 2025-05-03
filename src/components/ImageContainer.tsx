import React, { useRef, useState, useEffect } from 'react';
import { useImageEditor } from '../context/ImageEditorContext';
import NoImage from './NoImage';
import { Maximize, Minimize, RefreshCw } from 'lucide-react';

const ImageContainer: React.FC = () => {
  const {
    image,
    zoom,
    setZoom,
    rotation,
    setRotation,
    filters,
    setFilters
  } = useImageEditor();

  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!image) return;

    setDragging(true);
    setDragStart({
      x: e.clientX,
      y: e.clientY
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging || !image) return;

    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;

    setPosition(prevPosition => ({
      x: prevPosition.x + deltaX,
      y: prevPosition.y + deltaY
    }));

    setDragStart({
      x: e.clientX,
      y: e.clientY
    });
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  useEffect(() => {
    setPosition({ x: 0, y: 0 });
  }, [image]);

  const filterString = `
    ${filters.main.negative ? 'invert(100%)' : ''}
    ${filters.main.grayscale ? 'grayscale(100%)' : ''}
    brightness(${filters.main.brightness}%)
    contrast(${filters.main.contrast}%)
  `;

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleReset = () => {
    setZoom({ main: 1 });
    setRotation({ main: 0 });
    setFilters({
      main: {
        negative: false,
        grayscale: false,
        brightness: 100,
        contrast: 100,
      },
    });
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      className={`flex flex-1 items-center justify-center bg-[#1a1a1a] bg-opacity-50 relative overflow-hidden ${isFullscreen ? 'fullscreen' : ''}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {image ? (
        <div
          className="absolute transition-transform duration-300 ease-out"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) 
                      scale(${zoom.main}) 
                      rotate(${rotation.main}deg)`,
            filter: filterString,
            willChange: 'transform, filter',
          }}
        >
          <img
            src={image}
            alt="Image chargée"
            className={`max-w-full max-h-full object-contain ${dragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            draggable="false"
          />
        </div>
      ) : (
        <NoImage />
      )}
      {image && (
        <>
          <button
            onClick={toggleFullscreen}
            className="absolute top-2 right-2 bg-[#2a2a2a] bg-opacity-70 hover:bg-opacity-90 text-gray-200 hover:text-white rounded-md p-2 transition-colors"
            title={isFullscreen ? "Quitter le plein écran" : "Plein écran"}
          >
            {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
          </button>
          <button
            onClick={handleReset}
            className="absolute top-2 left-2 bg-[#2a2a2a] bg-opacity-70 hover:bg-opacity-90 text-gray-200 hover:text-white rounded-md p-2 transition-colors"
            title="Réinitialiser l'image"
          >
            <RefreshCw size={20} />
          </button>
        </>
      )}
    </div>
  );
};

export default ImageContainer;
