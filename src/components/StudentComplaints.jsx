import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DownloadIcon } from "lucide-react";
import { Button } from "./ui/button";
import { utils, writeFile } from "xlsx";

export function StudentComplaints({
  complaints,
  currentPage,
  perPage,
  totalComplaints,
  onPageChange,
}) {
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

  const handleDownloadExcel = () => {
    if (complaints.length === 0) {
      return;
    }

    const data = [
      [
        "Date",
        "Registration No.",
        "Student Name",
        "Gender",
        "Complaint Title",
        "Description",
        "Status",
        "Complaint By",
        "MobileNo",
        "Email",
        "Last Modify By",
      ],
    ];
    complaints.forEach((complaint) => {
      const row = [
        complaint.dateTime.slice(0, 10),
        complaint.registrationNumber,
        complaint.studentName,
        complaint.gender,
        complaint.title,
        complaint.description,
        complaint.status,
        complaint.facultyName,
        complaint.studentMobileNo,
        complaint.email,
        complaint.modifiedBy[complaint.modifiedBy.length - 1],
      ];
      data.push(row);
    });

    const ws = utils.aoa_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Complaints");
    writeFile(wb, "complaints.xlsx");
  };

  return (
    <div className="flex flex-col">
      <Accordion
        type="single"
        collapsible
        className="w-full rounded-2xl flex flex-col gap-y-3"
      >
        {currentComplaints.map((complaint, index) => (
          <AccordionItem
            className="rounded-2xl bg-violet-200"
            key={index}
            value={`item-${index}`}
          >
            <AccordionTrigger className="pl-8 mx-4 text-primary">
              <div className="flex gap-3 items-center">
              <div
                className={`relative rounded-full h-6 w-6 ${
                  complaint.status === "Resolved"
                  ? "bg-green-400"
                  : "bg-orange-400"
                }`}
                ></div>
                <div>{complaint.title}</div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pl-8 mx-4 flex flex-col gap-2 text-violet-400 font-semibold">
              <div>{complaint.description}</div>
              <div className="justify-between flex mr-6">
                <div style={{ fontWeight: "bold", fontStyle: "italic" }}>
                  {complaint.dateTime.slice(0, 10)}
                </div>
                <div style={{ fontWeight: "bold", fontStyle: "italic" }}>
                  Complaint By: {complaint.facultyName}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      {complaints.length > 0 && (
        <div className="flex mt-4 justify-between items-center align-bottom ">
          <div className="">
            <Button onClick={handleDownloadExcel}>
              <DownloadIcon className="" size={20} />
            </Button>
          </div>
          <div>
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
      )}
    </div>
  );
}
