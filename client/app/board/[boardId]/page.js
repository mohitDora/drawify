"use client";
import Canvas from '@/components/shared/Canvas';
import { addUserToBoard } from '@/lib/ApiFunction';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const BoardPage = () => {
  const {user} = useKindeBrowserClient();
  const { boardId } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push(`/login?redirect=/board/${boardId}`);
      addUserToBoard(boardId,user?.id)
    }else{
      addUserToBoard(boardId,user?.id)
    }
  }, [user, boardId, router]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <p>{user?.given_name+" "+user?.family_name}</p>
      <h1>Board: {boardId}</h1>
      <Canvas boardId={boardId} />
    </div>
  );
};

export default BoardPage;
