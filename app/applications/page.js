
import React from "react";
import MyApplications from "../../components/molecules/Applications";
import axios from "axios";
import { cookies } from "next/headers";


// `https://www.zohoapis.eu/crm/v2/Deals/search?criteria=(ID_CANDIDAT:equals:${studentID})`,
async function fetchApplications(accessToken, studentID) {
  try {
    const jobs = await axios.get(
      `https://www.zohoapis.eu/crm/v2/Deals/search?criteria=(ID_CANDIDAT:equals:${studentID})`,
      {
        headers: {
          Authorization: `${accessToken}`, // Ensure correct format
        },
      }
    );
    console.log({ jobs });
    return jobs.data.data;
  } catch (error) {
    console.error("Error fetching candidate profile:", error);
    return null;
  }
}

export default async function Applications() {
  const response = await axios.get(process.env.ACCESSTOKEN_URL);
  const accessToken = response.data.access_token;

  // Fetch cookies
  const cookieStore = cookies();
  const userInfo = cookieStore.get("data")?.value;
  const userInfoData = userInfo ? JSON.parse(userInfo) : null;

  const applications = await fetchApplications(accessToken, userInfoData?.STUDENT_ID);

  
  return (
    <div>
      <MyApplications myApplications={applications} />
    </div>
  );
}