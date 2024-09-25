import React from 'react';
import banner from "../../public/assets/cv_builder.png";
import Image from 'next/image';

function Services() {
  return (
    <div className="flex h-screen bg-gray-100 p-10">
      <div className="text-center">
        
        {/* CV Builder Card Teaser */}
        <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Cover Image */}
          <Image
            src={banner}
            alt="CV Builder Cover"
            className="w-full h-48 object-cover"
          />
          
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2">Créateur de CV</h2>
            <p className="text-gray-700 text-base">
              Facilitez la création de votre CV avec notre outil puissant. Personnalisez-le en quelques minutes.
            </p>
            <p className="mt-4 text-[#623CEA] font-semibold">Disponible bientôt !</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
