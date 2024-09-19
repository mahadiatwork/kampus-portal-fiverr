// pages/job/[id].js

import axios from 'axios';
import JobDetails from '../../../components/molecules/JobDetails';
import { cookies } from 'next/headers';

async function fetchJobDetails(id, accessToken) {
  try {
    const jobs = await axios.get(`https://www.zohoapis.eu/crm/v2.1/ZORDIJOB/${id}`, {
      headers: {
        Authorization: `${accessToken}`, // Ensure correct format
      },
    });
    return jobs.data.data[0];
  } catch (error) {
    console.error("Error fetching candidate profile:", error);
    return null;
  }
}


export default async function JobPage({ params }) {
  const { id } = params; // Get the job ID from the URL via the `params` object
  const response = await axios.get(process.env.ACCESSTOKEN_URL);
  const accessToken = response.data.access_token;

  const job = await fetchJobDetails(id,accessToken); // Fetch the job details asynchronously

 // Fetch cookies
 const cookieStore = cookies();
 const userInfo = cookieStore.get('data')?.value;
 const userInfoData = userInfo ? JSON.parse(userInfo) : null;

  if (!job) {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <JobDetails job={job} userInfoData={userInfoData} />
    </div>
  );
}
