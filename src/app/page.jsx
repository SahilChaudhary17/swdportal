"use client"
import React, { useEffect } from "react";
import { useRouter } from "next/navigation"; 
import Dashboard from "@/components/Dashboard";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("complaintToken");
    if (!token) {
      router.push("/login");
    }
  }, []); 
  return (
    <div>
      <Dashboard/>
    </div>
  );
}
