import React from 'react';
import { ZoomIn, ZoomOut, RotateCw, RotateCcw, Droplets, Paintbrush, Sun, Moon } from 'lucide-react';
import { useImageEditor } from '../context/ImageEditorContext';
import Button from './ui/Button';

const Toolbar: React.FC = () => {
  const {
    image,
    zoom,
    setZoom,
    rotation,
    setRotation,
    filters,
    setFilters
  } = useImageEditor();

  const handleZoomIn = () => {
    if (!image) return;
    setZoom({
      ...zoom,
      main: Math.min(zoom.main + 0.1, 3)
    });
  };

  const handleZoomOut = () => {
    if (!image) return;
    setZoom({
      ...zoom,
      main: Math.max(zoom.main - 0.1, 0.1)
    });
  };

  const handleRotate = (direction: 'clockwise' | 'counterclockwise') => {
    if (!image) return;
    const change = direction === 'clockwise' ? 90 : -90;
    setRotation({
      ...rotation,
      main: rotation.main + change
    });
  };

  const toggleFilter = (filterType: 'negative' | 'grayscale') => {
    if (!image) return;
    setFilters({
      ...filters,
      main: {
        ...filters.main,
        [filterType]: !filters.main[filterType]
      }
    });
  };

  const handleBrightnessChange = (amount: number) => {
    if (!image) return;
    setFilters({
      ...filters,
      main: {
        ...filters.main,
        brightness: Math.max(0, Math.min((filters.main.brightness || 100) + amount, 200))
      }
    });
  };

  const handleContrastChange = (amount: number) => {
    if (!image) return;
    setFilters({
      ...filters,
      main: {
        ...filters.main,
        contrast: Math.max(0, Math.min((filters.main.contrast || 100) + amount, 200))
      }
    });
  };

  return (
    <aside className="w-full md:w-64 bg-[#1e1e1e] bg-opacity-75 backdrop-blur-md border-t md:border-l md:border-t-0 border-[#2a2a2a] p-4">
      <div className="flex flex-col space-y-6">
        <div className="pb-4 border-b border-[#2a2a2a]">
          <h3 className="font-medium mb-3">Zoom</h3>
          <div className="flex items-center space-x-3">
            <Button onClick={handleZoomOut} disabled={!image} title="Réduire">
              <ZoomOut size={18} />
            </Button>

            <div className="w-14 text-center">
              {image ? `${(zoom.main * 100).toFixed(0)}%` : '-'}
            </div>

            <Button onClick={handleZoomIn} disabled={!image} title="Agrandir">
              <ZoomIn size={18} />
            </Button>
          </div>
        </div>

        <div className="pb-4 border-b border-[#2a2a2a]">
          <h3 className="font-medium mb-3">Rotation</h3>
          <div className="flex items-center space-x-3">
            <Button
              onClick={() => handleRotate('counterclockwise')}
              disabled={!image}
              title="Rotation -90°"
            >
              <RotateCcw size={18} />
            </Button>

            <Button
              onClick={() => handleRotate('clockwise')}
              disabled={!image}
              title="Rotation 90°"
            >
              <RotateCw size={18} />
            </Button>
          </div>
        </div>

        <div className="pb-4 border-b border-[#2a2a2a]">
          <h3 className="font-medium mb-3">Luminosité et Contraste</h3>
          <div className="flex items-center space-x-3">
            <Button onClick={() => handleBrightnessChange(-10)} disabled={!image} title="Diminuer la luminosité">
              <Moon size={18} />
            </Button>
            <Button onClick={() => handleBrightnessChange(10)} disabled={!image} title="Augmenter la luminosité">
              <Sun size={18} />
            </Button>
            <Button onClick={() => handleContrastChange(-10)} disabled={!image} title="Diminuer le contraste">
              C-
            </Button>
            <Button onClick={() => handleContrastChange(10)} disabled={!image} title="Augmenter le contraste">
              C+
            </Button>
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-3">Filtres</h3>
          <div className="flex flex-col space-y-3">
            <Button
              onClick={() => toggleFilter('negative')}
              disabled={!image}
              active={!!image && filters.main.negative}
              title="Filtre négatif"
            >
              <Droplets size={18} className="mr-2" />
              <span>Négatif</span>
            </Button>

            <Button
              onClick={() => toggleFilter('grayscale')}
              disabled={!image}
              active={!!image && filters.main.grayscale}
              title="Noir & Blanc"
            >
              <Paintbrush size={18} className="mr-2" />
              <span>Noir & Blanc</span>
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Toolbar;
