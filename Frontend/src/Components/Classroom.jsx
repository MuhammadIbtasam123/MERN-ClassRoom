// import React from "react";
import classroomImg from "../assets/idea-text-brain-drawn-outline-face-blackboard.jpg";

const AnnouncementCard = () => (
  <div className="bg-white p-4 rounded shadow mb-4">
    <h3 className="text-lg font-semibold mb-2">Announcements</h3>
    <p>Latest announcement goes here.</p>
  </div>
);

const AssignmentCard = () => (
  <div className="bg-white p-4 rounded shadow mb-4">
    <h3 className="text-lg font-semibold mb-2">Assignments</h3>
    <ul>
      <li>
        <a href="path/to/assignment.pdf" download className="text-green-500">
          Assignment 1
        </a>
      </li>
      {/* Add more assignments as needed */}
    </ul>
  </div>
);

const SubmissionCard = () => (
  <div className="bg-white p-4 rounded shadow mb-4">
    <h3 className="text-lg font-semibold mb-2">Submit Assignment</h3>
    <input type="file" className="mb-2" />
    <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition">
      Submit
    </button>
  </div>
);

const ClassRoom = () => {
  return (
    <div className="flex-1 p-4">
      <h2 className="text-2xl font-semibold mb-4">Classroom</h2>
      <div className="bg-white p-4 rounded shadow mb-4 flex items-center">
        <img
          src={classroomImg}
          alt="Class"
          className="h-16 w-16 rounded-full mr-4"
        />
        <div>
          <h3 className="text-lg font-semibold">Class Name</h3>
        </div>
      </div>
      <AnnouncementCard />
      <AssignmentCard />
      <SubmissionCard />
    </div>
  );
};

export default ClassRoom;
