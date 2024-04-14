import React, { useState, useEffect } from "react";
import { DatePicker } from "./CreateComplaint";
import { Input } from "./ui/input";
import { StudentComplaints } from "./StudentComplaints";
import { format } from "date-fns";
import { Button } from "./ui/button";
import { BallTriangle } from "react-loader-spinner";

const DownloadExcel = () => {
  const [allComplaints, setAllComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalComplaints, setTotalComplaints] = useState(0);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [registrationNo, setRegistrationNo] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [resetDatePicker, setResetDatePicker] = useState(false);
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch(
          `${process.env.SERVER_APP_URL}/faculty/complaints`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch complaints");
        }

        const data = await response.json();
        setAllComplaints(data.complaints);
        setFilteredComplaints(data.complaints);
        setTotalComplaints(data.complaints.length);
      } catch (error) {
        setError(error.message);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    };

    fetchComplaints();
  }, []);

  useEffect(() => {
    filterComplaints();
  }, [fromDate, toDate, registrationNo]);

  const filterComplaints = () => {
    let filtered = [...allComplaints];

    if (fromDate && toDate) {
      filtered = filtered.filter((complaint) => {
        const complaintDate = new Date(complaint.dateTime);
        return (
          complaintDate >= new Date(fromDate) &&
          complaintDate <= new Date(toDate)
        );
      });
    }

    if (registrationNo.length === 10) {
      filtered = filtered.filter((complaint) => {
        return complaint.registrationNumber === registrationNo;
      });
    }

    setFilteredComplaints(filtered);
    setTotalComplaints(filtered.length);
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const handleReset = () => {
    setFromDate(null);
    setToDate(null);
    setRegistrationNo("");
    setResetDatePicker(!resetDatePicker);
  };

  if (loading) {
    return (
      <div
      className="fixed inset-0 flex justify-center items-center backdrop-filter backdrop-blur-sm z-50"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
    >
      <div className="relative">
        <BallTriangle height={100} width={100} color="#C5D4EA" />
      </div>
    </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="">
      <form className="gap-5 rounded-3xl p-6 flex flex-col  text-white shadow-xl bg-primary">
        <h2 className="text-lg leading-6">Filter complaints by</h2>
        <div className="flex gap-4 justify-between">
          <div className="flex flex-col w-full sm:w-auto">
            <label
              htmlFor="fromDate"
              className="text-base leading-6 text-opacity-80 mb-1"
            >
              From Date:
            </label>
            <DatePicker
              onSelect={(date) => setFromDate(format(date, "PP"))}
              selected={fromDate}
              reset={resetDatePicker}
            />
          </div>
          <div className="flex flex-col w-full sm:w-auto">
            <label
              htmlFor="toDate"
              className="text-base leading-6 text-opacity-80 mb-1"
            >
              To Date:
            </label>
            <DatePicker
              onSelect={(date) => setToDate(format(date, "PP"))}
              selected={toDate}
              reset={resetDatePicker}
            />
          </div>
          <div className="w-1 h-24 rounded-full bg-white"></div>
          <div className="flex flex-col w-full sm:w-auto">
            <label
              htmlFor="registrationNo"
              className="text-base leading-6 text-opacity-80 mb-1 "
            >
              Registration Number:
            </label>
            <Input
              type="text"
              id="registrationNo"
              name="registrationNo"
              placeholder="21XYZ00000"
              value={registrationNo.toUpperCase()}
              onChange={(e) => setRegistrationNo(e.target.value)}
              className=" rounded-2xl  text-base text-primary dark:text-white  font-semibold  px-4 "
            />
          </div>
          <Button
            type="button"
            variant="destructive"
            onClick={handleReset}
            className=" p-6 rounded-3xl mt-4 sm:mt-8 hover:scale-105  "
          >
            Reset Filter
          </Button>
        </div>
      </form>
      <div className="mt-4">
        <StudentComplaints
          complaints={filteredComplaints}
          currentPage={currentPage}
          perPage={3}
          totalComplaints={totalComplaints}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default DownloadExcel;
