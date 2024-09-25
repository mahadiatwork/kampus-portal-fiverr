import React from "react";
import JobLists from "../../components/molecules/JobLists";
import axios from "axios";

async function fetchJobs(accessToken) {
  try {
    const jobs = await axios.get(`https://www.zohoapis.eu/crm/v2.1/ZORDIJOB?fields=JOB_ID,Intitul_du_poste,Profil_souhait_exp_rience_comp_tence	,Localisation_poste,Date_recrutement&per_page=200`, {
      headers: {
        Authorization: `${accessToken}`, // Ensure correct format
      },
    });
    return jobs.data.data;
  } catch (error) {
    console.error("Error fetching candidate profile:", error);
    return null;
  }
}

export default async function Jobs() {
  const response = await axios.get(process.env.ACCESSTOKEN_URL);
  const accessToken = response.data.access_token;

  const jobs = await fetchJobs(accessToken);

  console.log({ jobs });

  return (
    <div className="bg-gray-100 min-h-screen">
      <JobLists jobResp={jobs} />
    </div>
  );
}
