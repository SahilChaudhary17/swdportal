import React, { useState, useEffect } from "react";
import { DatePicker } from "./CreateComplaint";
import { Input } from "./ui/input";
import { StudentComplaints } from "./StudentComplaints";
import { format } from "date-fns";

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
        setLoading(false);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    filterComplaints();
  };

  const handleReset = () => {
    setFromDate(null);
    setToDate(null);
    setRegistrationNo("");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="py-4 pr-8 pl-8 font-semibold rounded-3xl shadow-md bg-violet-200"
      >
        <h2 className="text-lg leading-6 text-violet-500">
          Filter complaints by
        </h2>
        <div className="flex gap-5 justify-between items-center mt-4">
          <div className="flex flex-col">
            <label
              htmlFor="fromDate"
              className="text-base leading-6 text-violet-500 text-opacity-80 mt-1"
            >
              From Date:
            </label>
            <div className="relative flex items-center mt-2">
              <DatePicker
                onSelect={(date) => setFromDate(format(date, "PP"))}
                selected={fromDate}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="toDate"
              className="text-base leading-6 text-violet-500 text-opacity-80 mt-1"
            >
              To Date:
            </label>
            <div className="relative flex items-center mt-2">
              <DatePicker
                onSelect={(date) => setToDate(format(date, "PP"))}
                selected={toDate}
              />
            </div>
          </div>
          <div className="w-1 h-24 bg-black border"></div>
          <div className="flex flex-col">
            <label
              htmlFor="registrationNo"
              className="text-base leading-6 text-violet-500 text-opacity-80 mt-1"
            >
              Registration No.:
            </label>
            <Input
              type="text"
              id="registrationNo"
              name="registrationNo"
              placeholder="21XYZ00000"
              value={registrationNo}
              onChange={(e) => setRegistrationNo(e.target.value.toUpperCase())}
              className="px-3 py-1.5 text-violet-500 rounded-xl mt-2 border-violet-500"
            />
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="justify-center px-3.5 py-1.5 text-lg text-white bg-violet-500 rounded-3xl mt-7"
          >
            Reset Filter
          </button>
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
