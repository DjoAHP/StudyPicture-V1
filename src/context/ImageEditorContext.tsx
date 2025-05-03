import React, { createContext, useContext, useState, ReactNode } from 'react';

type ZoomState = {
  main: number;
};

type RotationState = {
  main: number;
};

type FilterState = {
  negative: boolean;
  grayscale: boolean;
  brightness?: number;
  contrast?: number;
};

type FiltersState = {
  main: FilterState;
};

type ImageEditorContextType = {
  image: string | null;
  setImage: (url: string | null) => void;
  zoom: ZoomState;
  setZoom: React.Dispatch<React.SetStateAction<ZoomState>>;
  rotation: RotationState;
  setRotation: React.Dispatch<React.SetStateAction<RotationState>>;
  filters: FiltersState;
  setFilters: React.Dispatch<React.SetStateAction<FiltersState>>;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUrlUpload: (url: string) => void;
};

const initialZoom: ZoomState = {
  main: 1
};

const initialRotation: RotationState = {
  main: 0
};

const initialFilterState: FilterState = {
  negative: false,
  grayscale: false,
  brightness: 100,
  contrast: 100,
};

const initialFilters: FiltersState = {
  main: { ...initialFilterState }
};

const ImageEditorContext = createContext<ImageEditorContextType | null>(null);

export const ImageEditorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [image, setImage] = useState<string | null>(null);
  const [zoom, setZoom] = useState<ZoomState>(initialZoom);
  const [rotation, setRotation] = useState<RotationState>(initialRotation);
  const [filters, setFilters] = useState<FiltersState>(initialFilters);
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.type.match('image.*')) {
      alert('Veuillez sélectionner une image valide.');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setImage(event.target.result as string);
        setZoom(initialZoom);
        setRotation(initialRotation);
        setFilters(initialFilters);
      }
    };
    reader.readAsDataURL(file);
  };
  
  const handleUrlUpload = (url: string) => {
    try {
      new URL(url);
    } catch (_) {
      alert('Veuillez entrer une URL valide.');
      return;
    }
    
    setImage(url);
    setZoom(initialZoom);
    setRotation(initialRotation);
    setFilters(initialFilters);
  };
  
  return (
    <ImageEditorContext.Provider
      value={{
        image,
        setImage,
        zoom,
        setZoom,
        rotation,
        setRotation,
        filters,
        setFilters,
        handleFileUpload,
        handleUrlUpload
      }}
    >
      {children}
    </ImageEditorContext.Provider>
  );
};

export const useImageEditor = () => {
  const context = useContext(ImageEditorContext);
  if (!context) {
    throw new Error('useImageEditor must be used within an ImageEditorProvider');
  }
  return context;
};
