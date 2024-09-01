"use client";
import { StoreProvider } from "@/hooks/Store";
import { Toaster } from "@/components/ui/sonner";

const MyLayout = ({ children }) => {
  return (
      <StoreProvider>
        {children}
        <Toaster />
      </StoreProvider>
  );
};

export default MyLayout;
