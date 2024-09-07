// components/JobDetails.js

export default function JobDetails({ job }) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
        <div className="text-gray-600 mb-6">
          <span className="font-semibold">Job Categories:</span>
          <span className="ml-2 text-sm text-gray-700">{job.categories.join(", ")}</span>
        </div>
  
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-gray-600">
            <p>
              <span className="font-semibold">Date Posted:</span> {job.postedDate}
            </p>
            <p>
              <span className="font-semibold">Location:</span> {job.location}
            </p>
          </div>
          <div className="text-gray-600">
            <p>
              <span className="font-semibold">Employment Type:</span> {job.employmentType}
            </p>
            <p>
              <span className="font-semibold">Salary:</span> {job.salary}
            </p>
          </div>
          <div className="text-gray-600">
            <p>
              <span className="font-semibold">Website:</span> {job.website}
            </p>
          </div>
          <div className="text-gray-600">
            <p>
              <span className="font-semibold">Phone:</span> {job.phone}
            </p>
          </div>
        </div>
  
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Description:</h2>
          <p className="text-gray-700">{job.description}</p>
        </div>
  
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Primary Areas of Accountability:</h2>
          <ul className="list-disc list-inside text-gray-700 grid grid-cols-2 gap-y-1">
            {job.accountability.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
  
        <div className="flex space-x-4">
          <button className="bg-[#FFCF56] py-2 px-4 rounded-lg">
            APPLY FOR A JOB
          </button>
        </div>
      </div>
    );
  }
  