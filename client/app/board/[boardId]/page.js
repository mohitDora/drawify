"use client";
import Canvas from "@/components/shared/Canvas";
import { addUserToBoard } from "@/lib/ApiFunction";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const BoardPage = () => {
  const { user } = useKindeBrowserClient();
  const { boardId } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      const kindeIssuerUrl = process.env.KINDE_ISSUER_URL;
      const clientId = process.env.KINDE_CLIENT_ID;
      const redirectUri = process.env.KINDE_REDIRECT_URI;
      const loginUrl = `${kindeIssuerUrl}/oauth2/auth?client_id=${clientId}&response_type=code&scope=openid profile email&redirect_uri=${redirectUri}`;
      window.location.href = loginUrl;
      addUserToBoard(boardId, user?.id);
    } else {
      addUserToBoard(boardId, user?.id);
    }
  }, [user, boardId, router]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <p>{user?.given_name + " " + user?.family_name}</p>
      <h1>Board: {boardId}</h1>
      <Canvas boardId={boardId} />
    </div>
  );
};

export default BoardPage;
