import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const TeacherSubmission = () => {
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [studentDetails, setStudentDetails] = useState([]);
  const { classroomId } = useParams();

  // Fetch assignments from the backend
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/getAssignments/${classroomId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("Assignments:", response.data.assignments);
        setAssignments(response.data.assignments);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };

    fetchAssignments();
  }, [classroomId]);

  // Function to get assignment details
  const getAssignmentDetails = (assignmentId) => {
    return assignments.find((assignment) => assignment._id === assignmentId);
  };

  // Function to format date in 12-hour format
  const formatDueDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true, // Use 12-hour format
    };
    return date.toLocaleDateString("en-US", options);
  };

  // Function to fetch student details who submitted the selected assignment
  const fetchStudentSubmissionsDetails = async (assignmentId) => {
    try {
      console.log("Assignment ID:", assignmentId);
      const response = await axios.get(
        `http://localhost:8080/api/getSubmissions/${assignmentId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Student details:", response.data);
      setStudentDetails(response.data);
    } catch (error) {
      console.error("Error fetching student details:", error);
    }
  };

  // Function to view assignment image
  const viewAssignmentImage = (assignmentId) => {
    const assignment = assignments.find(
      (assignment) => assignment._id === assignmentId
    );
    const assignmentImageUrl = `http://localhost:8080/api/assignemntRubric/${assignment.assignmentFile}`;
    window.open(assignmentImageUrl, "_blank");
  };

  // Function to view rubric image
  const viewRubricImage = (assignmentId) => {
    const assignment = assignments.find(
      (assignment) => assignment._id === assignmentId
    );
    const rubricImageUrl = `http://localhost:8080/api/assignemntRubric/${assignment.rubric}`;
    window.open(rubricImageUrl, "_blank");
  };

  // Function to view submission solution
  const viewSubmissionSolution = (solutionUrl) => {
    window.open(
      `http://localhost:8080/api/assignemntRubric/${solutionUrl}`,
      "_blank"
    );
  };

  // Function to handle assignment button click
  const handleAssignmentClick = (assignmentId) => {
    setSelectedAssignment(assignmentId);
    fetchStudentSubmissionsDetails(assignmentId);
  };

  return (
    <div className="min-h-screen bg-green-950 text-white p-4 flex flex-col items-center">
      <div className="bg-green-300 text-green-950 w-full rounded-lg shadow-md p-4 mb-4">
        <h2 className="text-2xl font-semibold mb-4">Student Submissions</h2>
        <div className="mb-4" style={{ width: "80%" }}>
          <h3 className="text-lg font-semibold mb-2">Assignments:</h3>
          <div className="flex flex-wrap justify-start">
            {assignments.map((assignment) => (
              <div key={assignment._id} className="mr-2 mb-2">
                <button
                  onClick={() => handleAssignmentClick(assignment._id)}
                  className={`px-4 py-2 rounded ${
                    selectedAssignment === assignment._id
                      ? "bg-green-700"
                      : "bg-green-600"
                  } hover:bg-green-700 transition`}
                  style={{ minWidth: "120px" }}
                >
                  {assignment.name}
                </button>
              </div>
            ))}
          </div>
        </div>
        {selectedAssignment && (
          <div className="mt-4 p-4 bg-white rounded shadow">
            <h3 className="text-lg font-semibold mb-2">
              Assignment Details:{" "}
              {getAssignmentDetails(selectedAssignment).name}
            </h3>
            <p>
              Description:{" "}
              {getAssignmentDetails(selectedAssignment).description}
            </p>
            <p>
              Due Date:{" "}
              {formatDueDate(getAssignmentDetails(selectedAssignment).dueDate)}
            </p>
            <div className="mt-5">
              <button
                className=" bg-green-500 text-white px-4 py-2 rounded"
                onClick={() => viewAssignmentImage(selectedAssignment)}
              >
                View Assignment
              </button>
              <button
                className="ml-2 bg-green-500 text-white px-4 py-2 rounded"
                onClick={() => viewRubricImage(selectedAssignment)}
              >
                View Rubric
              </button>
            </div>
          </div>
        )}
        {studentDetails.length > 0 && (
          <div className="mt-4 p-4 bg-white rounded shadow">
            <h3 className="text-lg font-semibold mb-2">Student Submissions</h3>
            <table className="w-full">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>ID</th>
                  <th>View Solution</th>
                </tr>
              </thead>
              <tbody>
                {studentDetails.map((submission) => (
                  <tr key={submission.student._id}>
                    <td className="text-center pt-4">
                      {submission.student.name}
                    </td>
                    <td className="text-center pt-4">
                      {submission.student._id}
                    </td>
                    <td className="text-center pt-4">
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded"
                        onClick={() =>
                          viewSubmissionSolution(submission.submission.solution)
                        }
                      >
                        View Solution
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherSubmission;
