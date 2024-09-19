// src/components/SearchBar.js

import React from 'react';

const SearchBar = ({
  jobTitle,
  location,
  category,
  onJobTitleChange,
  onLocationChange,
  onCategoryChange,
  onSearch,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
      {/* Job Title Input */}
      <div className="flex items-center border border-gray-300 rounded-lg p-2 flex-grow w-full md:w-auto">
        <input
          type="text"
          placeholder="Titre de poste, mots-clés, ou entreprise"
          className="outline-none pl-2 flex-grow"
          value={jobTitle}
          onChange={onJobTitleChange}
        />
      </div>
      {/* Location Input */}
      <div className="flex items-center border border-gray-300 rounded-lg p-2 w-full md:w-auto">
        <input
          type="text"
          placeholder="Ville ou code postal"
          className="outline-none pl-2 flex-grow"
          value={location}
          onChange={onLocationChange}
        />
      </div>
      {/* Category Select */}
      <div className="flex items-center border border-gray-300 rounded-lg p-2 w-full md:w-auto">
        <select
          className="outline-none pl-2 bg-transparent flex-grow"
          value={category}
          onChange={onCategoryChange}
        >
          <option value="">Choisir une catégorie</option>
          <option>Ventes & Marketing</option>
          <option>Construction / Installations</option>
          <option>Restauration / Services Alimentaires</option>
        </select>
      </div>
      {/* Search Button */}
      <button
        className="bg-[#623CEA] text-white px-4 py-2 rounded-lg w-full md:w-auto hover:bg-[#5245B6]"
        onClick={onSearch}
      >
        Recherche
      </button>
    </div>
  );
};

export default SearchBar;
