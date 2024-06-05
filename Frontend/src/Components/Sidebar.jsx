import PropTypes from "prop-types";

const SideBar = ({ onClassroomClick, classes, setClassId }) => {
  const handleClassroomClick = (classId) => {
    onClassroomClick(classId);
    setClassId(classId);
  };

  return (
    <div className="bg-green-800 text-white w-64 h-screen p-4 mt-2 ml-1 rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
      {classes.map((classroom) => (
        <button
          key={classroom._id}
          onClick={() => handleClassroomClick(classroom._id)}
          className="w-full flex items-center p-2 mb-2 bg-green-300 text-green-950 rounded hover:bg-green-400 transition"
        >
          {classroom.subject} : {classroom.section}
        </button>
      ))}
    </div>
  );
};

SideBar.propTypes = {
  onClassroomClick: PropTypes.func.isRequired,
  classes: PropTypes.array.isRequired, // Update to array
  setClassId: PropTypes.func.isRequired,
};

export default SideBar;
