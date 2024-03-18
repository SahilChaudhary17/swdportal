import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  
  export function StudentComplaints({ complaints, currentPage, perPage, totalComplaints, onPageChange }) {
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
                {complaint.title}
              </AccordionTrigger>
              <AccordionContent className="pl-8 mx-4 flex flex-col gap-2 text-violet-400 font-semibold">
                <div>{complaint.description}</div>
                <div className="justify-between flex mr-6">
                  <div style={{ fontWeight: 'bold', fontStyle: 'italic' }}>{complaint.dateTime.slice(0, 10)}</div>
                  <div style={{ fontWeight: 'bold', fontStyle: 'italic' }}>Complaint By: {complaint.facultyName}</div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="flex justify-center mt-4 items-center align-bottom ">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="w-24 mx-2 p-2 rounded-lg bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="mx-2">{currentPage} / {totalPages}</span>
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
  }
  