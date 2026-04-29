import { OAuth2Client } from "google-auth-library";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(new URL("/login?error=no_code", request.url));
  }

  try {
    const client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI
    );

    // Exchange code for tokens
    const { tokens } = await client.getToken(code);
    client.setCredentials(tokens);

    // Get user info from Google
    const userInfoRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });
    const userInfo = await userInfoRes.json();

    if (!userInfo.email) {
      return NextResponse.redirect(new URL("/login?error=no_email", request.url));
    }

    await dbConnect();

    // Find or create user
    let user = await User.findOne({ email: userInfo.email });

    if (!user) {
      // Split name if possible
      const nameParts = userInfo.name ? userInfo.name.split(" ") : [userInfo.given_name || "User", userInfo.family_name || ""];
      
      user = await User.create({
        firstName: nameParts[0],
        lastName: nameParts.slice(1).join(" ") || " ",
        email: userInfo.email,
        // No password for Google users
        password: Math.random().toString(36).slice(-16), // Random string just in case
      });
    }

    // Create JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Set cookie
    const cookie = serialize("linkflin_auth", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    // Redirect to dashboard
    const response = NextResponse.redirect(new URL("/dashboard", request.url));
    response.headers.set("Set-Cookie", cookie);
    return response;
    
  } catch (error) {
    console.error("Google Auth Callback Error details:", error);
    return NextResponse.redirect(new URL(`/login?error=google_failed&details=${encodeURIComponent(error.message)}`, request.url));
  }
}
