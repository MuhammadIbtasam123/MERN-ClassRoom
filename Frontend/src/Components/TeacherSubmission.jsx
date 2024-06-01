import { useState } from "react";
import heroMainImage from "../assets/hero-main.png";

// Dummy data for submissions; in a real application, this would come from the backend
const submissions = [
  {
    id: 1,
    studentName: "John Doe",
    status: "Good",
    file: heroMainImage,
  },
  {
    id: 2,
    studentName: "Jane Smith",
    status: "Excellent",
    file: "path/to/file2.pdf",
  },
  {
    id: 3,
    studentName: "Alice Johnson",
    status: "Satisfactory",
    file: "path/to/file3.png",
  },
  // Add more submissions as needed
];

const statuses = ["Poor", "Fair", "Satisfactory", "Good", "Excellent"];

const TeacherSubmission = () => {
  const [submissionData, setSubmissionData] = useState(submissions);

  const handleStatusChange = (id, newStatus) => {
    setSubmissionData(
      submissionData.map((submission) =>
        submission.id === id ? { ...submission, status: newStatus } : submission
      )
    );
  };

  return (
    <div className="min-h-screen bg-green-950 text-white p-4 flex flex-col items-center">
      <div className="bg-green-300 text-green-950 max-w-screen-2xl rounded-lg shadow-md p-4 mb-4">
        <h2 className="text-2xl font-semibold mb-4">Student Submissions</h2>
        <div>
          {submissionData.map((submission) => (
            <div
              key={submission.id}
              className="bg-white text-green-950 p-4 rounded shadow mb-4"
            >
              <h3 className="text-lg font-semibold mb-2">
                {submission.studentName}
              </h3>
              <div className="mb-2">
                <img
                  src={submission.file}
                  alt="Submission"
                  className="max-w-full h-auto"
                />
                {/* You can replace <img> with appropriate component for file types other than images */}
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <span>Status:</span>
                <select
                  value={submission.status}
                  onChange={(e) =>
                    handleStatusChange(submission.id, e.target.value)
                  }
                  className="p-2 rounded"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherSubmission;
