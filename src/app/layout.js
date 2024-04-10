import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({subsets:['latin'],  weight: '400',});

export const metadata = {
  title: "SW Discipline Portal",
  description: "Office of Students' Welfare",
};

// {/* <link href="https://fonts.googleapis.com/css2?family=Train+One&display=swap" rel="stylesheet"></link> */}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className } >
        <ThemeProvider attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
           {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
