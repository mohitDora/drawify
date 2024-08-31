"use client";
import { AuthProvider } from "@/hooks/AuthContext";
import { StoreProvider } from "@/hooks/Store";
import { Toaster } from "@/components/ui/sonner";

const MyLayout = ({ children }) => {
  return (
    <AuthProvider>
      <StoreProvider>
        {children}
        <Toaster />
      </StoreProvider>
    </AuthProvider>
  );
};

export default MyLayout;
