"use client";
import Canvas from '@/components/shared/Canvas';
import { useAuth } from '@/hooks/AuthContext';
import { addUserToBoard } from '@/lib/ApiFunction';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const BoardPage = () => {
  const { user } = useAuth();
  const { boardId } = useParams();
  const router = useRouter();

  useEffect(() => {
    // Ensure boardId and user are available before redirecting
    if (!user) {
      router.push(`/login?redirect=/board/${boardId}`);
      addUserToBoard(boardId,user?.uid)
    }else{
      addUserToBoard(boardId,user?.uid)
    }
  }, [user, boardId, router]);

  if (!user) {
    // Optionally render a loading state or message while redirecting
    return <p>Loading...</p>;
  }

  return (
    <div>
      <p>{user?.displayName}</p>
      <h1>Board: {boardId}</h1>
      <Canvas boardId={boardId} />
    </div>
  );
};

export default BoardPage;
