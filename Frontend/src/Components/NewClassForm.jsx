import { useState } from "react";

const NewClassForm = () => {
  const [className, setClassName] = useState("");
  const [subjects, setSubjects] = useState(["Math", "Science", "History"]);
  const [newSubject, setNewSubject] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  const addNewSubject = () => {
    if (newSubject && !subjects.includes(newSubject)) {
      setSubjects([...subjects, newSubject]);
      setNewSubject("");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-2xl font-semibold mb-4">Create New Class</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Class Name:</label>
        <input
          type="text"
          className="mt-1 p-2 border rounded w-full"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Subject:</label>
        <select
          className="mt-1 p-2 border rounded w-full"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          {subjects.map((subject, index) => (
            <option key={index} value={subject}>
              {subject}
            </option>
          ))}
        </select>
        <div className="flex mt-2">
          <input
            type="text"
            className="flex-grow p-2 border rounded"
            placeholder="Add new subject"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
            onClick={addNewSubject}
          >
            Add
          </button>
        </div>
      </div>
      <button className="bg-green-500 text-white px-4 py-2 rounded">
        Create Class
      </button>
    </div>
  );
};

export default NewClassForm;
