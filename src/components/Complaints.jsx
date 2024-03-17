"use client";
import React, { useState, useEffect } from "react";
import ComplaintCard from "./ComplaintCard/ComplaintCard";
import HeadingCard from "./HeadingCard";
import Student from "./Student";

const Complaints = ({ search }) => {
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  useEffect(() => {
    // Fetch complaints from the backend
    fetch(`${process.env.SERVER_APP_URL}/faculty/complaints`)
      .then((response) => response.json())
      .then((data) => {
        setComplaints(data.complaints);
      })
      .catch((error) => {
        console.error("Error fetching complaints:", error);
      });
  }, []);

  return (
    <>
      <div>
        <HeadingCard heading={"View existing complaints"} />
        {selectedComplaint ? (
          <Student complaint={selectedComplaint} onBack={setSelectedComplaint} />
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {search === ""
              ? complaints
                  .slice(0, 9)
                  .map((complaint) => (
                    <ComplaintCard
                      key={complaint._id}
                      complaint={complaint}
                      onViewDetails={setSelectedComplaint}
                    />
                  ))
              : complaints
                  .filter((complaint) =>
                    complaint.registrationNumber.startsWith(
                      search.toUpperCase()
                    )
                  )
                  .map((complaint) => (
                    <ComplaintCard
                      key={complaint._id}
                      complaint={complaint}
                      onViewDetails={setSelectedComplaint}
                    />
                  ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Complaints;
