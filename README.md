# Candidate Profile Management

This project is a Next.js application designed to manage candidate profiles, allowing users to update their personal information and upload CVs. It integrates with Zoho CRM to update profile data using API routes in Next.js.

## Features

- **Profile Management**: Edit candidate details such as first name, last name, and email.
- **File Upload**: Upload CVs directly from the profile page.
- **API Integration**: Connects with Zoho CRM to update candidate information using secure API routes.
- **Form Handling**: Client-side form handling with feedback messages for successful or failed updates.

## Technologies Used

- **Next.js 14**: React framework for server-side rendering and static site generation.
- **React**: Frontend library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Axios**: Promise-based HTTP client for making requests to the API.
- **Zoho CRM API**: Integration with Zoho CRM for updating candidate profiles.

## Getting Started

### Prerequisites

- Node.js (version 14 or later)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/candidate-profile-management.git
   cd candidate-profile-management
   ```

2. Install the dependencies:

```bash
npm install

# or

yarn install
```

3. Set up environment variables:

Create a .env file in the root directory and add the following:
```
ACCESSTOKEN_URL=your_access_token_url
```
Replace your_access_token_url with the correct URL for fetching the access token.