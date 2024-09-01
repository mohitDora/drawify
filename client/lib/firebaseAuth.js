// // firebaseAuth.js
// import { auth } from '@/firebase';
// import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

// // Sign in function
// const provider = new GoogleAuthProvider();
// export const signInWithGoogle = async () => {
//     try {
//       const result = await signInWithPopup(auth, provider);
//       return result.user;
//     } catch (error) {
//       throw error;
//     }
//   };

// // Sign out function
// export const logOut = async () => {
//   try {
//     await signOut(auth);
//   } catch (error) {
//     throw error;
//   }
// };

// // Check if user is authenticated
// export const authStateChanged = (callback) => {
//   return onAuthStateChanged(auth, callback);
// };
