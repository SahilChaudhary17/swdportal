import React, { useState } from "react";
import { Input } from "./ui/input";
import HeadingCard from "./HeadingCard";
import ModifyForm from "./ModifyForm";
import { Toast } from "./Toast";
import { Button } from "./ui/button";
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
      className={`shrink-0 rounded-3xl ${colorClass} bg-opacity-50 h-6 w-6`}
    />
  );
};

const ComplaintCard = ({ complaint, onSelectComplaint }) => {
  const handleModify = () => {
    onSelectComplaint(complaint);
  };

  return (
    <div className="bg-secondary rounded-3xl shadow-lg p-4 text-center max-w-96 flex flex-col">
      <div className="flex-grow">
        <h2 className="break-words text-ellipsis font-medium">
          {complaint.title}
        </h2>
      </div>
      <p className="mt-4">Date: {complaint.dateTime.substr(0, 10)}</p>

      <div class="mt-4 flex items-center gap-2 justify-between">
        <Button
          onClick={handleModify}
          className="bg-primary p-6 rounded-3xl shadow hover:scale-105 font-semibold"
        >
          Modify
        </Button>
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
    <div className=" flex flex-col">
      <div className="max-w-screen-xl flex-grow ">
        <section className="grid grid-flow-col gap-5">
          {currentComplaints.map((complaint, index) => (
            <ComplaintCard
              key={index}
              complaint={complaint}
              onSelectComplaint={onSelectComplaint}
            />
          ))}
        </section>
      </div>
      {/* prev-next button div */}
      <div className="flex items-center mt-6">
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
      Toast.fire({
        icon: "warning",
        title: "Please enter a valid 00XYZ00000 format registration number.",
      });
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
      // console.error("Error fetching complaints:", error);
      Toast.fire({
        icon: "error",
        title: error.message,
      });
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
          <header className="flex gap-5 justify-between flex-wrap">
            <div className=" relative flex gap-3 items-center">
              <div className=" w-1/2 py-4 rounded-2xl bg-[#d9d9d9] px-7 text-primary font-semibold">
                Registration Number
              </div>
              <Input
                className="rounded-2xl w-1/2 text-base font-semibold px-4"
                type="text"
                name="regNumber"
                placeholder="00XYZ00000"
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
              />
            </div>
            <button
              className="bg-primary px-4 py-3 rounded-3xl text-white shadow hover:scale-105 ease-in font-semibold"
              onClick={fetchComplaints}
              disabled={!registrationNumber || loading}
            >
              {loading ? "Loading..." : "Fetch Complaints"}
            </button>
          </header>
          <main className="mt-4 w-full">
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
                <div className="text-primary text-xl">
                  No complaints exist for this registration number.
                </div>
              )
            ) : (
              <div className="text-primary text-xl">
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
