"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { logOut } from "@//lib/firebaseAuth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuth } from "@/hooks/AuthContext";
import { createBoard, fetchBoards } from "@/lib/ApiFunction";
import { Card } from "@/components/ui/card";
import Link from "next/link";

function page() {
  const router = useRouter();
  const { user } = useAuth();
  const [boards, setBoards] = useState([]);

  const handleLogout = async () => {
    try {
      await logOut();
      router.push("/");
      toast("Logout Successful");
    } catch (error) {
      console.error(error);
      toast("Server error");
    }
  };

  const createBoardFunc = async () => {
    if (user?.uid) {
      try {
        await createBoard({
          title: "Untitled",
          createdBy: user?.uid,
          users: [user.uid],
        });
        toast("Board created");
        fetchAndSetBoards();
      } catch (error) {
        console.error("Error:", error);
        toast(`Server Error: ${error.message}`);
      }
    }
  };
  
  const fetchAndSetBoards = async () => {
    if (user?.uid) {
      try {
        const boardsData = await fetchBoards(user?.uid);
        setBoards(boardsData);
      } catch (error) {
        console.error("Error fetching boards:", error);
        // Handle error if needed
      }
    }
  };

  useEffect(() => {
    fetchAndSetBoards();
  }, [user]);

  const _boards = boards?.map((item, index) => {
    // console.log("item",item)
    return (
      <Link href={`/board/${item._id}`} key={item?._id}>
        <div >
          {item?.title}
          {item?.createdBy}
        </div>
      </Link>
    );
  });
  return (
    <div>
      <h1>{user?.displayName}</h1>
      {_boards?.length>0 ? _boards : "Empty"}
      <Button onClick={createBoardFunc}>Create</Button>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}

export default page;
