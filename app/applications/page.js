'use client';

import { useState } from 'react';

export default function MyApplications() {
  // Mock data for demonstration
  const [applications] = useState([
    {
      id: 1,
      companyName: 'TechCorp',
      position: 'Frontend Developer',
      appliedDate: '2024-08-20',
      status: 'Under Review',
    },
    {
      id: 2,
      companyName: 'InnoSoft',
      position: 'Backend Developer',
      appliedDate: '2024-08-18',
      status: 'Interview Scheduled',
    },
    {
      id: 3,
      companyName: 'Webify',
      position: 'Full Stack Developer',
      appliedDate: '2024-08-15',
      status: 'Application Received',
    },
    {
      id: 4,
      companyName: 'DataWave',
      position: 'Data Analyst',
      appliedDate: '2024-08-10',
      status: 'Rejected',
    },
  ]);

  // Function to determine the color of the status chip
  const getStatusColor = (status) => {
    switch (status) {
      case 'Under Review':
        return 'bg-yellow-100 text-yellow-800';
      case 'Interview Scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'Application Received':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-5">
      <h1 className="text-2xl font-bold mb-6">My Applications</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                Company Name
              </th>
              <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                Position
              </th>
              <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                Applied Date
              </th>
              <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr key={application.id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border-b">{application.companyName}</td>
                <td className="px-4 py-2 border-b">{application.position}</td>
                <td className="px-4 py-2 border-b">
                  {new Date(application.appliedDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border-b">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      application.status
                    )}`}
                  >
                    {application.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
