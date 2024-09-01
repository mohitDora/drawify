// "use client";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { useAuth } from "@/hooks/AuthContext";
// import { signInWithGoogle } from "@/lib/firebaseAuth";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// export default function LoginForm() {
//     const { user } = useAuth();
//     const router = useRouter();
  
//     useEffect(() => {
//       if (user) {
//         router.push("/");
//       }
//     }, [user, router]);
//     const handleGoogleLogin = async () => {
//       try {
//         const res=await signInWithGoogle();
//         registerUser({
//             _id:res.uid,
//             name:res.displayName,
//             email:res.email
//           })
//           const params = new URLSearchParams(window.location.search);
//           const redirectUrl = params.get('redirect') || '/dashboard';
    
//           router.push(redirectUrl);
//       } catch (error) {
//         console.error("Google sign-in error:", error);
//       }
//     };
//   return (
//     <Card className="mx-auto max-w-sm">
//       <CardHeader>
//         <CardTitle className="text-2xl">Login</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="grid gap-4">
//           <Button variant="outline" onClick={handleGoogleLogin} className="w-full">
//             Login with Google
//           </Button>
//         </div>
//         <div className="mt-4 text-center text-sm">
//           Don&apos;t have an account?{" "}
//           <Link href="/signup" className="underline">
//             Sign up
//           </Link>
//         </div>
//       </CardContent>
      
//     </Card>
//   )
// }
