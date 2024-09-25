'use client';

import axios from 'axios';
import { useState, useEffect } from 'react';

export default function MyApplications({ myApplications }) {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    // Map the myApplications data to the structure expected in the UI
    if (myApplications && myApplications.length > 0) {
      const mappedApplications = myApplications.map((application) => ({
        id: application.id,
        companyName: application.NOM_ENTREPRISE || 'Unknown Company',
        position: application.Deal_Name || 'Unknown Position',
        appliedDate: application.Closing_Date || 'N/A',
        status: application.Stage || 'Unknown Status',
      }));
      setApplications(mappedApplications);
    }
  }, [myApplications]);

  // Function to determine the color of the status chip
  const getStatusColor = (status) => {
    switch (status) {
      case 'Qualification':
        return 'bg-yellow-100 text-yellow-800';
      case 'Under Review':
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
            {applications.length > 0 ? (
              applications.map((application) => (
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
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
