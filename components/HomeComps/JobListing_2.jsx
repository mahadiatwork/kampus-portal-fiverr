// src/components/JobCard.js

import React from 'react';

const JobCard = ({ job }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md flex flex-col space-y-2">
      <div className="flex items-center space-x-2">
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{job.title}</h3>
          <p className="text-sm text-gray-500">{job.company}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4 text-sm text-gray-500">
        <span>{job.location}</span>
        <span>•</span>
        <span>{job.postedTime}</span>
        <span>•</span>
        <span>{job.salary}</span>
      </div>
      <div className="flex space-x-2">
        {job.tags.map((tag, index) => (
          <span
            key={index}
            className={`px-2 py-1 rounded-full text-xs ${tag.type === 'status' ? 'bg-blue-100 text-blue-700' : tag.type === 'privacy' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}
          >
            {tag.label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default JobCard;
