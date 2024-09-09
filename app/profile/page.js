// pages/profile/page.js

import Profile from '../../components/molecules/Profile';
import axios from "axios";
import { cookies } from 'next/headers'; // Import cookies API

async function fetchCandidateProfile() {
    const response = await axios.get(process.env.ACCESSTOKEN_URL);
  // Simulate fetching candidate data
  // Replace with actual data fetching logic from your API or database
  const cookieStore = cookies();
  const userInfo = cookieStore.get('data')?.value;
  const userInfoData = JSON.parse(userInfo)
  console.log({userInfoData})
  const userFound = await axios.get(
    `https://www.zohoapis.com/crm/v2/Portal_Users/` + userInfoData?.record_id,
    {
      headers: {
        Authorization: response.data.access_token,
      },
    }
  );
  return userFound.data.data[0];
}

export default async function ProfilePage() {
  const cookieStore = cookies();
  const data = cookieStore.get('token')?.value;
  console.log({cookieStore})
  const candidate = await fetchCandidateProfile();

  return (
    <div className="bg-gray-100 min-h-screen pt-10">
      <Profile candidate={candidate} />
    </div>
  );
}
