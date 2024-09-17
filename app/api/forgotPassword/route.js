import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request) {
  const { email } = await request.json();
  try {
    const response = await axios.get(process.env.ACCESSTOKEN_URL);

    // if response doesn't contain accesstoken then return null
    if (!response.data.access_token) {
      return NextResponse.json({
        ok: false,
        error: "Access token not found",
      });
    }
    const userFound = await axios.get(
      `https://www.zohoapis.eu/crm/v2/Portal_Users/search?criteria=(Email:equals:${email})`,
      {
        headers: {
          Authorization: response.data.access_token,
        },
      }
    );
    console.log({ userFound: userFound.data });
    //if user not found with this email
    if (!userFound.data) {
      return NextResponse.json({
        ok: false,
        error: "Please input valid data",
      });
    }
    //if user already tried to reset password within 30 minutes then block him to change password
    if (userFound.data.data[0].Reset_Password) {
      return NextResponse.json({
        ok: false,
        error: "You can't change password within 30 minutes twice.",
      });
    }
    // reset password by setting Reset_Password field true
    const data = JSON.stringify({
      data: [
        {
          id: userFound.data.data[0].id,
          Reset_Password: true,
        },
      ],
    });

    const resetPasswordResponse = await axios.put(
      `https://www.zohoapis.eu/crm/v2/Portal_Users`,
      data,
      {
        headers: {
          Authorization: response.data.access_token,
        },
      }
    );
    // if error occured
    if (!resetPasswordResponse.data) {
      return NextResponse.json({
        ok: false,
        error: "Something went wrong",
      });
      return;
    }
    console.log("RESPONSEEE", resetPasswordResponse.data);
    return NextResponse.json({
      ok: true,
      message: "Please check your email",
    });
  } catch (err) {
    console.log({ err });
    return NextResponse.json({ ok: false, err: JSON.stringify(err) });
  }
}
