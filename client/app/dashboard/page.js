"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createBoard, fetchBoards } from "@/lib/ApiFunction";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";

function page() {
  const { user } = useKindeBrowserClient();
  console.log(user);
  const [boards, setBoards] = useState([]);

  const createBoardFunc = async () => {
    if (user?.id) {
      try {
        await createBoard({
          title: "Untitled",
          createdBy: user?.id,
          users: [user.id],
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
    if (user?.id) {
      try {
        const boardsData = await fetchBoards(user?.id);
        setBoards(boardsData);
      } catch (error) {
        console.error("Error fetching boards:", error);
      }
    }
  };

  useEffect(() => {
    fetchAndSetBoards();
  }, [user]);

  const _boards = boards?.map((item, index) => {
    return (
      <Link href={`/board/${item._id}`} key={item?._id}>
        <div>
          {item?.title}
          {item?.createdBy}
        </div>
      </Link>
    );
  });
  return (
    <div>
      <h1>{user?.given_name + " " + user?.family_name}</h1>

      {_boards?.length > 0 ? _boards : "Empty"}
      <Button onClick={createBoardFunc}>Create</Button>
      <LogoutLink>
        <Button>Logout</Button>
      </LogoutLink>
    </div>
  );
}

export default page;
