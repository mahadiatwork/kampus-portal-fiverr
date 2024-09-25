import axios from 'axios';
import { NextResponse } from 'next/server';

// Handling the POST request to update user data
export async function POST(request) {
  try {
    // Parse JSON body from the request
    const body = await request.json();
    const response = await axios.get(process.env.ACCESSTOKEN_URL);

    // Extracting data from the request body
    const { firstName, lastName, email, CV_LINK, id } = body;

    // Prepare the data to update
    const updatedUser = {
      First_Name: firstName,
      Last_Name: lastName,
      Email: email,
    };

    // Conditionally add CV_LINK if it is not empty
    if (CV_LINK && CV_LINK.trim() !== '') {
      updatedUser.CV_Link = CV_LINK;
    }

    // Make a PATCH request to update the user in Zoho CRM
    const updateUserRep = await axios.patch(
      `https://www.zohoapis.eu/crm/v2/Portal_Users/${id}`,
      { data: [updatedUser] }, // Wrapping updatedUser in a "data" array as per Zoho CRM's API structure
      {
        headers: {
          Authorization: `${response.data.access_token}`, // Include Bearer prefix
          'Content-Type': 'application/json', // Ensure the content type is set
        },
      }
    );

    console.log({updateUserRep: updateUserRep.data.data[0].details})

    // Return a success response with the updated user data
    return NextResponse.json({ success: true, data: updateUserRep.data.data[0] });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update profile.', details: error.response?.data },
      { status: 500 }
    );
  }
}
