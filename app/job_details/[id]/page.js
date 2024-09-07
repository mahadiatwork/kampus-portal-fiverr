// pages/job/page.js

import JobDetails from '../../../components/molecules/JobDetails';

async function fetchJobDetails() {
  // Simulate fetching data from a server or database
  // Replace this with real data fetching from your API or database
  return {
    title: 'HouseHold',
    categories: ['Project', 'Managers'],
    postedDate: 'Posted 7 months ago',
    location: 'Aurora, Colorado',
    employmentType: 'Full Time',
    salary: '$35000 - 38000',
    website: 'Demolink.org',
    phone: '(800) 1234567',
    description:
      "Project managers ensure that a project is completed on time and within budget, that the project's objectives are met and that everyone is doing their job properly. Projects are usually separate to usual day-to-day business activities and require a group of people to work together to achieve a set of specific objectives. Project managers oversee the project to ensure the desired result is achieved, the most efficient resources are used and the different interests involved are satisfied.",
    accountability: [
      'Agreeing project objectives;',
      'Overseeing the accounting, costing and billing;',
      'Carrying out risk assessment;',
      'Monitoring sub-contractors;',
      'Representing the clients;',
      'Using IT systems to keep track of progress;',
      'Making sure the quality standards are met;',
      'Providing advice on the management of projects;',
    ],
  };
}

export default async function JobPage() {
  const job = await fetchJobDetails();

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <JobDetails job={job} />
    </div>
  );
}
