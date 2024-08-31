import { Open_Sans, Roboto_Mono } from "next/font/google";
import "./globals.css";
import MyLayout from "@/components/shared/MyLayout";

const openSans = Open_Sans({
    subsets: ['latin'],
    display: 'swap',
    //👇 Add variable to our object
    variable: '--font-opensans',
  })
  
  //👇 Configure the object for our second font
  const robotoMono = Roboto_Mono({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-roboto-mono',
  })

export const metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${openSans.variable} ${robotoMono.variable} font-sans`}>
                <MyLayout>
                    {children}
                </MyLayout>
            </body>
        </html>
    );
}
