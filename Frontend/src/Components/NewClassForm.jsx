// import { useState } from "react";

// const NewClassForm = () => {
//   const [className, setClassName] = useState("");
//   const [subjects, setSubjects] = useState(["Math", "Science", "History"]);
//   const [newSubject, setNewSubject] = useState("");
//   const [selectedSubject, setSelectedSubject] = useState("");

//   const addNewSubject = () => {
//     if (newSubject && !subjects.includes(newSubject)) {
//       setSubjects([...subjects, newSubject]);
//       setNewSubject("");
//     }
//   };

//   return (
//     <div className="bg-white shadow-md rounded-lg p-4">
//       <h2 className="text-2xl font-semibold mb-4">Create New Class</h2>
//       <div className="mb-4">
//         <label className="block text-gray-700">Class Name:</label>
//         <input
//           type="text"
//           className="mt-1 p-2 border rounded w-full"
//           value={className}
//           onChange={(e) => setClassName(e.target.value)}
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700">Subject:</label>
//         <select
//           className="mt-1 p-2 border rounded w-full"
//           value={selectedSubject}
//           onChange={(e) => setSelectedSubject(e.target.value)}
//         >
//           {subjects.map((subject, index) => (
//             <option key={index} value={subject}>
//               {subject}
//             </option>
//           ))}
//         </select>
//         <div className="flex mt-2">
//           <input
//             type="text"
//             className="flex-grow p-2 border rounded"
//             placeholder="Add new subject"
//             value={newSubject}
//             onChange={(e) => setNewSubject(e.target.value)}
//           />
//           <button
//             className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
//             onClick={addNewSubject}
//           >
//             Add
//           </button>
//         </div>
//       </div>
//       <button className="bg-green-500 text-white px-4 py-2 rounded">
//         Create Class
//       </button>
//     </div>
//   );
// };

// export default NewClassForm;

import { useState } from "react";
import axios from "axios";

const NewClassForm = () => {
  const [className, setClassName] = useState("");
  const [subjects, setSubjects] = useState([
    "Math",
    "Science",
    "History",
    "English",
    "Geography",
    "Computer Science",
    "Art",
    "Physical Education",
  ]);
  const [newSubject, setNewSubject] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  const addNewSubject = () => {
    if (newSubject && !subjects.includes(newSubject)) {
      setSubjects([...subjects, newSubject]);
      setNewSubject("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/createClass",
        {
          name: className,
          subject: selectedSubject,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Class created successfully:", response.data);
      // You can handle success behavior here, like showing a success message or redirecting
    } catch (error) {
      console.error("Error creating class:", error);
      // You can handle error behavior here, like showing an error message
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-2xl font-semibold mb-4">Create New Class</h2>
      <form onSubmit={handleSubmit}>
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
            <option value="">Select Subject</option>
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
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
              onClick={addNewSubject}
            >
              Add
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Create Class
        </button>
      </form>
    </div>
  );
};

export default NewClassForm;
