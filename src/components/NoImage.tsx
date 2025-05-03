import React from 'react';
import { Image } from 'lucide-react';

const NoImage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-gray-400 p-6 text-center">
      <Image size={64} className="mb-4 opacity-50" />
      <h3 className="text-lg font-medium mb-2">Aucune image chargée</h3>
      <p className="text-sm max-w-md">
        Importez une image depuis votre ordinateur ou chargez-en une via URL en utilisant les boutons dans l'en-tête.
      </p>
    </div>
  );
};

export default NoImage;
