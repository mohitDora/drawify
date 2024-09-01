import { NextResponse } from "next/server";
import jwksClient from "jwks-rsa";
import jwt from "jsonwebtoken";
import { registerUser } from "@/lib/ApiFunction";

// The Kinde issuer URL should already be in your `.env` file
// from when you initially set up Kinde. This will fetch your
// public JSON web keys file
const client = jwksClient({
  jwksUri: `${process.env.KINDE_ISSUER_URL}/.well-known/jwks.json`,
});

export async function POST(req) {
  try {
    // Get the token from the request
    const token = await req.text();

    // Decode the token
    const { header } = jwt.decode(token, { complete: true });
    const { kid } = header;

    // Verify the token
    const key = await client.getSigningKey(kid);
    const signingKey = key.getPublicKey();
    const event = await jwt.verify(token, signingKey);

    // Handle various events
    switch (event?.type) {
      case "user.deleted":
        // handle user updated event
        // e.g update database with event.data
        console.log(event.data);
        break;
      case "user.created":
        try {
          const data = {
            id: event?.data?.user?.id,
            family_name: event?.data?.user?.last_name,
            given_name: event?.data?.user?.first_name,
            email: event?.data?.user?.email,
          };
          registerUser({
            _id:data?.id,
            name:data?.given_name+" "+data?.family_name,
            email:data?.email
          })
          console.log(event.data);
        } catch (error) {
          console.log(error)
        }
        
        break;
      default:
        // other events that we don't handle
        break;
    }

  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      return NextResponse.json({ message: err.message }, { status: 400 });
    }
  }
  return NextResponse.json({ status: 200, statusText: "success" });
}