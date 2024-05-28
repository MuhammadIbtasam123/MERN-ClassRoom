// import React from "react";
import { Link } from "react-router-dom";

const NewClassButton = () => {
  return (
    <div className="flex justify-end">
      <Link to="/newClass">
        <button className="bg-green-500 text-white px-4 py-2 rounded">
          Create New Class
        </button>{" "}
      </Link>
    </div>
  );
};

export default NewClassButton;
