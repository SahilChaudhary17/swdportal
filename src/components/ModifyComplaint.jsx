import React, { useState } from "react";
import { Input } from "./ui/input";
import HeadingCard from "./HeadingCard";
import ModifyForm from "./ModifyForm";

const ModifyComplaint = () => {
  return (
    <div>
      <HeadingCard heading={"Modify existing complaints"} />
      <MyComponent />
    </div>
  );
};

export default ModifyComplaint;

const StatusIndicator = ({ status }) => {
  const colorClass = status === "Resolved" ? "bg-green-500" : "bg-amber-500";
  return (
    <div
      className={`shrink-0 rounded-3xl ${colorClass} bg-opacity-50 h-[39px] w-[39px]`}
    />
  );
};

const ComplaintCard = ({ complaint, onSelectComplaint }) => {
  const handleModify = () => {
    onSelectComplaint(complaint);
  };

  return (
    <div class=" bg-violet-500 bg-opacity-30 rounded-3xl shadow-lg px-6 py-6 text-center max-md:w-full w-{50vw} ">
      <h2 class="text-lg font-bold text-violet-700 leading-6">
         {complaint.title}
      </h2>
      <p class="mt-4 text-gray-500">Date: {complaint.dateTime.substr(0, 10)}</p>
      <div class="flex items-center gap-2 justify-between mt-4">
        <button
          onClick={handleModify}
          class="bg-violet-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
        >
          Modify
        </button>
        <StatusIndicator status={complaint.status} />
      </div>
    </div>
  );
};

const ComplaintsList = ({
  complaints,
  currentPage,
  perPage,
  totalComplaints,
  onPageChange,
  onSelectComplaint,
}) => {
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const currentComplaints = complaints.slice(startIndex, endIndex);

  const totalPages = Math.ceil(totalComplaints / perPage);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };
  return (
    <div className="w-full">
      <section className="flex gap-5  max-md:flex-col max-md:gap-0 ">
        {currentComplaints.map((complaint, index) => (
          <ComplaintCard
            key={index}
            complaint={complaint}
            onSelectComplaint={onSelectComplaint}
          />
        ))}
      </section>
      <div className="items-center relative align-bottom  mt-4 ">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="w-24 mx-2 p-2 rounded-lg bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="mx-2">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="w-24 mx-2 px-4 py-2 rounded-lg bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

const MyComponent = () => {
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalComplaints, setTotalComplaints] = useState(0);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const onPageChange = (page) => {
    setCurrentPage(page);
  };
  const fetchComplaints = async () => {
    if (!registrationNumber || registrationNumber.length !== 10) {
      alert("Please enter a valid 10-digit registration number.");
      return;
    }

    setLoading(true);
    setComplaints([]);
    try {
      const response = await fetch(
        `${process.env.SERVER_APP_URL}/faculty/complaints/student/${registrationNumber}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch complaints");
      }
      const data = await response.json();
      setComplaints(data.complaints);
      setTotalComplaints(data.complaints.length);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  const handleSelectComplaint = (complaint) => {
    setSelectedComplaint(complaint);
  };

  return (
    <div className="flex flex-col">
      {selectedComplaint ? (
        <ModifyComplaintForm
          selectedComplaint={selectedComplaint}
          onBack={setSelectedComplaint}
        />
      ) : (
        <div>
          <header className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
            <Input
              className="rounded-2xl max-w-sm flex-1 w-fit border border-violet-500 text-violet-400  font-semibold font-['Poppins']"
              type="text"
              name="regNumber"
              placeholder="Registration Number"
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value)}
            />
            <button
              className="justify-center  bg-violet-400 px-7 py-4 text-base text-white rounded-3xl shadow-2xl max-md:px-5"
              onClick={fetchComplaints}
              disabled={!registrationNumber || loading}
            >
              {loading ? "Loading..." : "Fetch Complaints"}
            </button>
          </header>
          <main className=" mt-4 w-full ">
            {submitted ? (
              complaints.length > 0 ? (
                <ComplaintsList
                  complaints={complaints}
                  currentPage={currentPage}
                  perPage={3}
                  totalComplaints={totalComplaints}
                  onPageChange={onPageChange}
                  onSelectComplaint={handleSelectComplaint}
                />
              ) : (
                <div>No complaints exist for this registration number.</div>
              )
            ) : (
              <div>
                Please enter the registration number to select the complaints.
              </div>
            )}
          </main>
        </div>
      )}
    </div>
  );
};

const ModifyComplaintForm = ({ selectedComplaint, onBack }) => {
  return <ModifyForm selectedComplaint={selectedComplaint} onBack={onBack} />;
};
