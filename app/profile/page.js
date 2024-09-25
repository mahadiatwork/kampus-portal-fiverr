// pages/profile/page.js

import Profile from '../../components/molecules/Profile';
import axios from "axios";
import { cookies } from 'next/headers'; // Import cookies API

async function fetchCandidateProfile(accessToken, userInfoData) {
  console.log({userInfoData})
  try {
    const userFound = await axios.get(
      `https://www.zohoapis.eu/crm/v2/Portal_Users/` + userInfoData?.record_id,
      {
        headers: {
          Authorization: `${accessToken}`, // Ensure correct format
        },
      }
    );
    return userFound.data.data[0];
  } catch (error) {
    console.error('Error fetching candidate profile:', error);
    return null;
  }
}

export default async function ProfilePage() {
  try {
    // Fetch access token
    const response = await axios.get(process.env.ACCESSTOKEN_URL);
    const accessToken = response.data.access_token;

    // Fetch cookies
    const cookieStore = cookies();
    const userInfo = cookieStore.get('data')?.value;
    const userInfoData = userInfo ? JSON.parse(userInfo) : null;

    if (!userInfoData) {
      console.error('User info not found in cookies');
      return <div>Error: User information is missing</div>;
    }

    const candidate = await fetchCandidateProfile(accessToken, userInfoData);

    return (
      <div className="bg-gray-100 min-h-screen pt-10">
        <Profile candidate={candidate} />
      </div>
    );
  } catch (error) {
    console.error('Error rendering ProfilePage:', error);
    return <div>Error loading profile</div>;
  }
}
