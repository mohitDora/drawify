"use client";
import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/AuthContext";
import { LoginLink, RegisterLink, useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  // const { user } = useAuth();
  const {user} = useKindeBrowserClient();
  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);
  return (
    <>
      <Navbar></Navbar>
      <div className="flex justify-center items-center w-full h-screen flex-col gap-4">
        <h1 className="scroll-m-20 text-6xl font-extrabold tracking-tight lg:text-8xl">
          Drawify<span className="text-primary text-9xl">.</span>
        </h1>

        <div className="flex gap-4">
          {/* <Link href="/signup"> */}
          <RegisterLink>
            <Button>Start Drawifing</Button>
          </RegisterLink>
          {/* </Link> */}
          {/* <Link href="/login"> */}
          <LoginLink>
            <Button variant="outline" className="border-pr">
              Log In
            </Button>
          </LoginLink>
          {/* </Link> */}
        </div>
      </div>
    </>
  );
}
