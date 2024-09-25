"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import JobListing from "../HomeComps/Joblisting";
import Navbar from "../common/Navbar";
import SearchBar from "../HomeComps/Search";

const JobLists = ({ jobResp }) => {
  const router = useRouter();
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [filteredJobs, setFilteredJobs] = useState(jobResp); // Initialize with jobResp
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5; // Number of jobs per page

  useEffect(() => {
    setFilteredJobs(jobResp); // Set initial filtered jobs with jobResp
  }, [jobResp]);

  // Filter jobs based on search criteria
  const filterJobs = () => {
    const filtered = jobResp.filter((job) => {
      return (
        (jobTitle === "" ||
          job.Intitul_du_poste.toLowerCase().includes(
            jobTitle.toLowerCase()
          )) &&
        (location === "" ||
          job.Localisation_poste.toLowerCase().includes(
            location.toLowerCase()
          )) &&
        (category === "" ||
          job.Profil_souhait_exp_rience_comp_tence.toLowerCase().includes(
            category.toLowerCase()
          ))
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
        <h2 className="text-xl font-bold mb-4">
          {filteredJobs?.length} Offres trouvées
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Affichage de {indexOfFirstJob + 1} à{" "}
          {Math.min(indexOfLastJob, filteredJobs.length)} sur{" "}
          {filteredJobs.length} offres
        </p>
        {currentJobs.map((job, index) => (
          <JobListing key={job.id || index} job={job} />
        ))}

        {/* Pagination Controls */}
        <div className="flex justify-center mt-8 space-x-2 flex-wrap">
          {/* Previous Button */}
          <button
            onClick={handlePreviousPage}
            className={`px-3 py-2 rounded ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#623CEA] text-white"
            }`}
            disabled={currentPage === 1}
          >
            &larr; Précédent
          </button>

          {/* Page Number Buttons with Ellipses */}
          {currentPage > 2 && (
            <>
              <button
                onClick={() => handlePageChange(1)}
                className="px-3 py-2 rounded bg-gray-200 text-gray-800 hover:bg-blue-100"
              >
                1
              </button>
              {currentPage > 3 && <span className="px-3 py-2">...</span>}
            </>
          )}

          {/* Dynamically show page numbers around the current page */}
          {Array.from({ length: totalPages }, (_, index) => {
            const pageNumber = index + 1;
            if (
              pageNumber === currentPage ||
              pageNumber === currentPage - 1 ||
              pageNumber === currentPage + 1
            ) {
              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`px-3 py-2 rounded ${
                    currentPage === pageNumber
                      ? "bg-[#623CEA] text-white"
                      : "bg-gray-200 text-gray-800 hover:bg-blue-100"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            }
          })}

          {/* Ellipses and Last Page */}
          {currentPage < totalPages - 2 && (
            <>
              {currentPage < totalPages - 3 && (
                <span className="px-3 py-2">...</span>
              )}
              <button
                onClick={() => handlePageChange(totalPages)}
                className="px-3 py-2 rounded bg-gray-200 text-gray-800 hover:bg-blue-100"
              >
                {totalPages}
              </button>
            </>
          )}

          {/* Next Button */}
          <button
            onClick={handleNextPage}
            className={`px-3 py-2 rounded ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#623CEA] text-white"
            }`}
            disabled={currentPage === totalPages}
          >
            Suivant &rarr;
          </button>
        </div>
      </div>
    </>
  );
};

export default JobLists;
