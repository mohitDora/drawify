// "use client";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { useAuth } from "@/hooks/AuthContext";
// import { signInWithGoogle } from "@/lib/firebaseAuth";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";
// import { registerUser } from "@/lib/ApiFunction";

// export default function SignupForm() {
//   const { user } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (user) {
//       router.push("/");
//     }
//   }, [user, router]);
//   const handleGoogleLogin = async () => {
//     try {
//       const res=await signInWithGoogle();
//       console.log(res)
//       registerUser({
//         _id:res.uid,
//         name:res.displayName,
//         email:res.email
//       })
//       router.push("/dashboard");
//     } catch (error) {
//       console.error("Google sign-in error:", error);
//     }
//   };
//   return (
//     <Card className="mx-auto max-w-sm">
//       <CardHeader>
//         <CardTitle className="text-xl">Sign Up</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="grid gap-4">
//           <Button
//             variant="outline"
//             onClick={handleGoogleLogin}
//             className="w-full"
//           >
//             Sign up with Google
//           </Button>
//         </div>
//         <div className="mt-4 text-center text-sm">
//           Already have an account?{" "}
//           <Link href="/login" className="underline">
//             Sign in
//           </Link>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }
