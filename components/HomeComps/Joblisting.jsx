// components/JobListing.js

"use client";

import { useRouter } from "next/navigation";

export default function JobListing({ job }) {
  const router = useRouter();

  if (!job) {
    return null; // Handle missing job data
  }

  // Define icons for different job types
  const getJobTypeIcon = (type) => {
    switch (type) {
      case "Temps Plein": // Assuming this is full-time
        return "🕒"; // Clock icon for full-time jobs
      case "Temps Partiel": // Part-time in French
        return "⏰"; // Alarm clock icon for part-time jobs
      case "Freelance":
        return "💼"; // Briefcase icon for freelance jobs
      default:
        return "📌"; // Default pin icon
    }
  };

  const handleApplyClick = (id) => {
    // Navigate to the job details page using the job's ID or a slug
    router.push(`/job_details/${id}`); // Adjust this path based on your routing structure
  };

  return (
    <div className="border-b p-4 flex items-center">
      <div className="flex-grow">
        <h3 className="text-lg font-semibold">
          {job.Intitul_du_poste || "Untitled Job"}
        </h3>
        <div className="text-sm text-gray-500">
          {/* Use flex and consistent width for icon containers to align icons */}
          <p className="flex items-center">
            <span className="mr-2 w-4 text-center">📍</span>{" "}
            {job.Localisation_poste || "Unknown location"}
          </p>
          <p className="flex items-center">
            <span className="mr-2 w-4 text-center">📅</span> Recruitment Date:{" "}
            {job.Date_recrutement || "N/A"}
          </p>
          <p className="flex items-center">
            <span className="mr-2 w-4 text-center">🏷️</span>{" "}
            {job.Profil_souhait_exp_rience_comp_tence || "No profile specified"}
          </p>
        </div>
      </div>
      <div className="ml-auto">
        <button
          className="px-4 py-2 bg-[#FFCF56] rounded hover:bg-[#623CEA] hover:text-white"
          onClick={() => handleApplyClick(job.id)}
        >
          Voir les détails
        </button>
      </div>
    </div>
  );
}
