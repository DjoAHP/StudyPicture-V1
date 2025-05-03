import React from "react";
import { Upload, ImageDown } from "lucide-react";
import { useImageEditor } from "../context/ImageEditorContext";
import Button from "./ui/Button";

const Header: React.FC = () => {
  const { handleFileUpload, handleUrlUpload } = useImageEditor();
  const [urlInput, setUrlInput] = React.useState<string>("");
  const [showUrlInput, setShowUrlInput] = React.useState<boolean>(false);

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (urlInput.trim()) {
      handleUrlUpload(urlInput);
      setUrlInput("");
      setShowUrlInput(false);
    }
  };

  return (
    <header className="bg-[#1e1e1e] bg-opacity-75 backdrop-blur-md p-4 border-b border-[#2a2a2a] shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-[#775e9a]">StudyPicture</h1>

        <div className="flex items-center space-x-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />

          <Button onClick={triggerFileInput} title="Importer une image">
            <Upload size={18} className="mr-2" />
            <span className="hidden sm:inline">Importer</span>
          </Button>

          {showUrlInput ? (
            <form onSubmit={handleUrlSubmit} className="flex">
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="Coller l'URL de l'image"
                className="px-3 py-2 bg-[#2a2a2a] bg-opacity-70 border border-[#3a3a3a] rounded-l-md focus:outline-none focus:ring-1 focus:ring-[#6200ee] text-white placeholder-gray-400"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-[#6200ee] rounded-r-md hover:bg-opacity-80 transition-colors"
              >
                OK
              </button>
            </form>
          ) : (
            <Button
              onClick={() => setShowUrlInput(true)}
              title="Charger via URL"
            >
              <ImageDown size={18} className="mr-2" />
              <span className="hidden sm:inline">URL</span>
            </Button>
          )}
          {/* RETOUR GALERIE  */}
          <a
            href="https://ma-galerie-dart.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button title="Ouvrir le lien dans un nouvel onglet">
              𝔾↩︎
              <span className="hidden sm:inline ml-2">Retour a la galerie</span>
            </Button>
          </a>
          {/* ------ */}
        </div>
      </div>
    </header>
  );
};

export default Header;
