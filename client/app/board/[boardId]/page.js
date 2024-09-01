"use client";
import Canvas from "@/components/shared/Canvas";
import { addUserToBoard } from "@/lib/ApiFunction";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const BoardPage = () => {
  const { user, isAuthenticated } = useKindeBrowserClient();
  const { boardId } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  

  // useEffect(() => {
  //   if (isAuthenticated === false) {
  //     // Redirect to login if not authenticated
  //     router.push(`/api/auth/login?post_login_redirect_url=/board/${boardId}`);
  //   } else if (isAuthenticated && user) {
  //     // Add user to board and stop loading once authenticated
  //     addUserToBoard(boardId, user.id);
  //     setLoading(false);
  //   }
  // }, []);

  // if (loading || !isAuthenticated || !user) {
  //   return <p>Loading...</p>;
  // }

  return (
    <div>
      <p>{user.given_name + " " + user.family_name}</p>
      <h1>Board: {boardId}</h1>
      <Canvas boardId={boardId} />
    </div>
  );
};

export default BoardPage;
