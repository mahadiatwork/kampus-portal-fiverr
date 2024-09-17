"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import JobListing from "../HomeComps/Joblisting";
import Navbar from "../common/Navbar";
import SearchBar from "../HomeComps/Search";

const jobs = [
  {
    title: 'Agent Immobilier Sénior Requis',
    location: 'Canada',
    published: 7,
    category: 'Ventes & Marketing',
    type: 'Temps Plein',
    image: '/path/to/image1.png',
  },
  {
    title: 'Collecteur de Dons pour Bureau de Charité',
    location: 'Inde',
    published: 7,
    category: 'Ventes & Marketing',
    type: 'Temps Plein',
    image: '/path/to/image2.png',
  },
  {
    title: 'Agent de Vérification des Comptes de Fin d\'Année',
    location: 'Inde',
    published: 7,
    category: 'Construction / Installations',
    type: 'Temps Plein',
    image: '/path/to/image3.png',
  },
  {
    title: 'Enseignante Requise pour les Étudiants',
    location: 'Australie',
    published: 7,
    category: 'Restauration / Services Alimentaires',
    type: 'Freelance',
    image: '/path/to/image4.png',
  },
  {
    title: 'Chef de Projet en Informatique',
    location: 'France',
    published: 5,
    category: 'Technologie de l\'Information',
    type: 'Temps Plein',
    image: '/path/to/image5.png',
  },
  {
    title: 'Développeur Web Junior',
    location: 'Belgique',
    published: 3,
    category: 'Technologie de l\'Information',
    type: 'Stage',
    image: '/path/to/image6.png',
  },
  {
    title: 'Consultant en Ressources Humaines',
    location: 'Suisse',
    published: 10,
    category: 'Ressources Humaines',
    type: 'Temps Partiel',
    image: '/path/to/image7.png',
  },
  {
    title: 'Spécialiste du Marketing Numérique',
    location: 'France',
    published: 2,
    category: 'Ventes & Marketing',
    type: 'Temps Plein',
    image: '/path/to/image8.png',
  },
  {
    title: 'Technicien de Maintenance Industrielle',
    location: 'Allemagne',
    published: 8,
    category: 'Ingénierie',
    type: 'Temps Plein',
    image: '/path/to/image9.png',
  },
  {
    title: 'Assistant Administratif Bilingue',
    location: 'Luxembourg',
    published: 4,
    category: 'Administration',
    type: 'Temps Plein',
    image: '/path/to/image10.png',
  },
];


const JobLists = () => {
  const router = useRouter();
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [filteredJobs, setFilteredJobs] = useState(jobs); // Initialize with all jobs
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5; // Number of jobs per page

  // Filter jobs based on search criteria
  const filterJobs = () => {
    const filtered = jobs.filter((job) => {
      return (
        (jobTitle === '' || job.title.toLowerCase().includes(jobTitle.toLowerCase())) &&
        (location === '' || job.location.toLowerCase().includes(location.toLowerCase())) &&
        (category === '' || job.category === category)
      );
    });
    setFilteredJobs(filtered);
    setCurrentPage(1); // Reset to the first page after filtering
  };

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <>
      <SearchBar
        jobTitle={jobTitle}
        location={location}
        category={category}
        onJobTitleChange={(e) => setJobTitle(e.target.value)}
        onLocationChange={(e) => setLocation(e.target.value)}
        onCategoryChange={(e) => setCategory(e.target.value)}
        onSearch={filterJobs}
      />
      <div className="max-w-2xl mx-auto py-10">
        <h2 className="text-xl font-bold mb-4">{filteredJobs?.length} Jobs Found</h2>
        <p className="text-sm text-gray-600 mb-6">
          Displaying {indexOfFirstJob + 1} - {Math.min(indexOfLastJob, filteredJobs.length)} of {filteredJobs.length} Jobs
        </p>
        {currentJobs.map((job, index) => (
          <JobListing key={index} job={job} />
        ))}

        {/* Pagination Controls */}
        <div className="flex justify-center mt-8 space-x-2">
          {/* Previous Button */}
          <button
            onClick={handlePreviousPage}
            className={`px-3 py-2 rounded ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#623CEA] text-white'}`}
            disabled={currentPage === 1}
          >
            &larr; Previous
          </button>

          {/* Page Number Buttons */}
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-[#623CEA] text-white' : 'bg-gray-200 text-gray-800 hover:bg-blue-100'}`}
            >
              {index + 1}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={handleNextPage}
            className={`px-3 py-2 rounded ${currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#623CEA] text-white'}`}
            disabled={currentPage === totalPages}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    </>
  );
};

export default JobLists;
