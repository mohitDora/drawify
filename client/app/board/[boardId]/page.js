"use client";
import Canvas from "@/components/shared/Canvas";
import { addUserToBoard } from "@/lib/ApiFunction";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { redirect, useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const BoardPage = () => {
  const { user } = useKindeBrowserClient();
  const { boardId } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      addUserToBoard(boardId, user?.id);
      redirect(`/api/auth/login?post_login_redirect_url=/board/${boardId}`)
      
    } else {
      addUserToBoard(boardId, user?.id);
    }
  }, [user]);

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
