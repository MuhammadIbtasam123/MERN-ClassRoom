// import TeacherDashboard from "./TeacherDashboard";
import TeacherStudent from "../Components/TeacherStudent";
import NavBar from "../Components/StudentDashboardClassroonNav";

const enrolledStudents = [
  { name: "John Doe", email: "john@example.com" },
  { name: "Jane Smith", email: "jane@example.com" },
];

const allStudents = [
  { name: "John Doe", email: "john@example.com" },
  { name: "Jane Smith", email: "jane@example.com" },
  { name: "Bob Brown", email: "bob@example.com" },
  { name: "Alice Johnson", email: "alice@example.com" },
];
const TeacherStudentData = () => {
  return (
    <div>
      <NavBar />
      <TeacherStudent
        enrolledStudents={enrolledStudents}
        allStudents={allStudents}
      />
    </div>
  );
};

export default TeacherStudentData;
