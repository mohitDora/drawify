import { NextResponse } from "next/server";
import jwksClient from "jwks-rsa";
import jwt from "jsonwebtoken";
import { registerUser } from "@/lib/ApiFunction";

const client = jwksClient({
  jwksUri: `${process.env.KINDE_ISSUER_URL}/.well-known/jwks.json`,
});

export async function POST(req) {
  try {
    const token = await req.text();
    const decodedToken = jwt.decode(token, { complete: true });
    const { header } = decodedToken;
    const { kid } = header;

    const key = await client.getSigningKey(kid);
    const signingKey = key.getPublicKey();
    const event = jwt.verify(token, signingKey);

    switch (event?.type) {
      case "user.deleted":
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
            _id: data?.id,
            name: data?.given_name + " " + data?.family_name,
            email: data?.email,
          });
          console.log(event.data);
        } catch (error) {
          console.log(error);
        }
        break;
      default:
        break;
    }
  } catch (err) {
    console.error(err.message);
    return NextResponse.json({ message: err.message }, { status: 400 });
  }
  return NextResponse.json({ status: 200, statusText: "success" });
}
