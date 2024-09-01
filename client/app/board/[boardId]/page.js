"use client";
import Canvas from "@/components/shared/Canvas";
import { addUserToBoard } from "@/lib/ApiFunction";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const BoardPage = () => {
  const { user, isAuthenticated } = useKindeBrowserClient();
  const { boardId } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to login and ensure the user comes back to the board page after login
      router.push(`/api/auth/login?post_login_redirect_url=/board/${boardId}`);
    } else if (user) {
      // Add user to board only after ensuring they are authenticated
      addUserToBoard(boardId, user.id);
    }
  }, [isAuthenticated, user, boardId, router]);

  if (!isAuthenticated || !user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <p>{user.given_name + " " + user.family_name}</p>
      <h1>Board: {boardId}</h1>
      <Canvas boardId={boardId} />
    </div>
  );
};

export default BoardPage;
