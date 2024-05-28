import image from "../assets/USer.png";
const StudentProfile = () => {
  return (
    <div className="min-h-screen bg-green-950 text-white p-4 flex flex-col items-center">
      {/* User Image Card */}
      <div className="bg-green-300 text-green-950 w-full max-w-md rounded-lg shadow-md p-4 mb-4">
        <div className="flex items-center">
          <img src={image} alt="User" className="h-16 w-16 rounded-full mr-4" />
          <div>
            <h2 className="text-2xl font-semibold">John Doe</h2>
          </div>
        </div>
      </div>

      {/* Student Information Card */}
      <div className="bg-green-300 text-green-950 w-full max-w-md rounded-lg shadow-md p-4 mb-4">
        <h3 className="text-xl font-semibold mb-2">Student Information</h3>
        <div className="space-y-2">
          <p>
            <strong>Student ID:</strong> 123456
          </p>
          <p>
            <strong>Name:</strong> John Doe
          </p>
          <p>
            <strong>Date of Birth:</strong> January 1, 2000
          </p>
          <p>
            <strong>Gender:</strong> Male
          </p>
          <p>
            <strong>Class:</strong> 10th Grade
          </p>
          <p>
            <strong>Section:</strong> A
          </p>
        </div>
      </div>

      {/* Contact Information Card */}
      <div className="bg-green-300 text-green-950 w-full max-w-md rounded-lg shadow-md p-4 mb-4">
        <h3 className="text-xl font-semibold mb-2">Contact Information</h3>
        <div className="space-y-2">
          <p>
            <strong>Cell No:</strong> (123) 456-7890
          </p>
          <p>
            <strong>Email:</strong> johndoe@example.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
