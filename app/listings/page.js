"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import JobListing_2 from "../../components/HomeComps/JobListing_2";
import Navbar from "../../components/common/Navbar";
import Search from "../../components/HomeComps/Search";
import Pagination from "../../components/HomeComps/Pagination";

const Dashboard = () => {
  const router = useRouter();
  const jobs = [
    {
      logo: "path-to-catalyst-logo", // Replace with actual logo path
      title: "Recruiting Coordinator",
      company: "Catalyst",
      location: "London, UK",
      postedTime: "11 hours ago",
      salary: "$35k - $45k",
      tags: [
        { label: "Temporary", type: "status" },
        { label: "Private", type: "privacy" },
      ],
    },
    {
      logo: "path-to-invision-logo", // Replace with actual logo path
      title: "Product Manager, Studio",
      company: "Invision",
      location: "London, UK",
      postedTime: "11 hours ago",
      salary: "$35k - $45k",
      tags: [
        { label: "Full Time", type: "status" },
        { label: "Urgent", type: "priority" },
      ],
    },
    {
      logo: "path-to-figma-logo", // Replace with actual logo path
      title: "Web Developer",
      company: "Figma",
      location: "London, UK",
      postedTime: "11 hours ago",
      salary: "$35k - $45k",
      tags: [{ label: "Part Time", type: "status" }],
    },
    {
      logo: "path-to-upwork-logo", // Replace with actual logo path
      title: "Senior Product Designer",
      company: "Upwork",
      location: "London, UK",
      postedTime: "11 hours ago",
      salary: "$35k - $45k",
      tags: [{ label: "Temporary", type: "status" }],
    },
    {
      logo: "path-to-segment-logo", // Replace with actual logo path
      title: "Software Engineer",
      company: "Segment",
      location: "London, UK",
      postedTime: "11 hours ago",
      salary: "$35k - $45k",
      tags: [
        { label: "Freelancer", type: "status" },
        { label: "Urgent", type: "priority" },
      ],
    },
    {
      logo: "path-to-catalyst-logo", // Replace with actual logo path
      title: "Recruiting Coordinator",
      company: "Catalyst",
      location: "London, UK",
      postedTime: "11 hours ago",
      salary: "$35k - $45k",
      tags: [
        { label: "Full Time", type: "status" },
        { label: "Urgent", type: "priority" },
      ],
    },
  ];
  const [currentPage, setCurrentPage] = useState(10); // Set an initial current page
  const totalPages = 20; // Set the total number of pages
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  return (
    <>
      <Navbar />
      <Search />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {jobs.map((job, index) => (
          <JobListing_2 key={index} job={job} />
        ))}
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default Dashboard;
