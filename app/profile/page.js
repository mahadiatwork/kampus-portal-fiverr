// pages/profile/page.js

import Profile from '../../components/molecules/Profile';
import axios from "axios";

async function fetchCandidateProfile() {
    const response = await axios.get(process.env.ACCESSTOKEN_URL);
  // Simulate fetching candidate data
  // Replace with actual data fetching logic from your API or database
  const userFound = await axios.get(
    `https://www.zohoapis.com/crm/v2/Portal_Users/1915689000112940017`,
    {
      headers: {
        Authorization: response.data.access_token,
      },
    }
  );
  return userFound.data.data[0];
}

export default async function ProfilePage() {
  const candidate = await fetchCandidateProfile();

  return (
    <div className="bg-gray-100 min-h-screen pt-10">
      <Profile candidate={candidate} />
    </div>
  );
}
