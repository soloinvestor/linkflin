import { serialize } from "cookie";

export async function POST() {
  const cookie = serialize("linkflin_auth", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(0), // Expire immediately
    path: "/",
  });

  return new Response(JSON.stringify({ message: "Logged out successfully" }), {
    status: 200,
    headers: { 
      "Content-Type": "application/json",
      "Set-Cookie": cookie
    },
  });
}
