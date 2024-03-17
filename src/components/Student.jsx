"use client";
import React, { useState, useEffect } from "react";
import { StudentComplaints } from "./StudentComplaints";
import { Button } from "./ui/button";

const Student = ({ complaint, onBack }) => {
  const url = process.env.SERVER_APP_URL;
  console.log(url);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalComplaints, setTotalComplaints] = useState(0);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch(
          `${url}/faculty/complaints/student`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ regNumber: complaint.registrationNumber }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch complaints");
        }

        const data = await response.json();
        setComplaints(data.complaints);
        setTotalComplaints(data.complaints.length);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };

    fetchComplaints();
  }, [complaint]);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col mt-4 gap-4">
      <div className="flex justify-between gap-4 items-center">
        <Button className="w-fit mr-8" onClick={() => onBack(null)}>
          Back
        </Button>
        <div className="grid grid-cols-2  font-['Poppins'] font-semibold">
          <h1>Student Registration Number: {complaint.registrationNumber}</h1>
          <h1>Student Name: {complaint.studentName}</h1>
          <h1>Student Mobile Number: {complaint.studentMobileNo}</h1>
          <h1>Student email: {complaint.email}</h1>
        </div>
      </div>
      <div className="relative flex flex-col">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="relative flex flex-col">
            <StudentComplaints
              complaints={complaints}
              currentPage={currentPage}
              perPage={3}
              totalComplaints={totalComplaints}
              onPageChange={onPageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Student;
