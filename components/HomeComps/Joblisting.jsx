// components/JobListing.js

'use client';

import { useRouter } from 'next/navigation';

export default function JobListing({ job }) {
  const router = useRouter();

  if (!job) {
    return null; // Handle missing job data
  }

  // Define icons for different job types
  const getJobTypeIcon = (type) => {
    switch (type) {
      case 'Full Time':
        return '🕒'; // Clock icon for full-time jobs
      case 'Part Time':
        return '⏰'; // Alarm clock icon for part-time jobs
      case 'Freelance':
        return '💼'; // Briefcase icon for freelance jobs
      case 'Internship':
        return '🎓'; // Graduation cap for internships
      default:
        return '📌'; // Default pin icon
    }
  };

  const handleApplyClick = () => {
    // Navigate to the job details page using the job's ID or a slug
    router.push(`/job_details/${job.id}`); // Adjust this path based on your routing structure
  };

  return (
    <div className="border-b p-4 flex items-center">
      <div className="flex-grow">
        <h3 className="text-lg font-semibold">{job.title || 'Untitled Job'}</h3>
        <div className="text-sm text-gray-500">
          {/* Use flex and consistent width for icon containers to align icons */}
          <p className="flex items-center">
            <span className="mr-2 w-4 text-center">📍</span> {job.location || 'Unknown location'}
          </p>
          <p className="flex items-center">
            <span className="mr-2 w-4 text-center">📅</span> Published {job.published ? `${job.published} years ago` : 'N/A'}
          </p>
          <p className="flex items-center">
            <span className="mr-2 w-4 text-center">🏷️</span> {job.category || 'No category'}
          </p>
          <p className="flex items-center text-xs text-gray-400">
            <span className="mr-2 w-4 text-center">{getJobTypeIcon(job.type)}</span> {job.type || 'No type specified'}
          </p>
        </div>
      </div>
      <div className="ml-auto">
        <button
          className="px-4 py-2 bg-[#FFCF56] rounded hover:bg-[#623CEA] hover:text-white"
          onClick={handleApplyClick}
        >
          Apply
        </button>
      </div>
    </div>
  );
}
