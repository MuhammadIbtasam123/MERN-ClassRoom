import { useState } from "react";

const Faqs = () => {
  // Sample FAQ data
  const faqs = [
    {
      id: 1,
      question: "How much does Class Companion cost?",
      answer:
        "Class Companion is free for teachers and students. The paid school or district plan includes LMS integration (e.g. assignment and grade syncing with Schoology and Canvas), AI / plagiarism detection, and more!",
    },
    {
      id: 2,
      question: "How can I get Data Privacy approval?",
      answer:
        "You can download the Data Privacy Packet to forward to your IT Director. This includes the Data Privacy Agreement. You can also email privacy@classcompanion.com with questions.",
    },
    {
      id: 3,
      question: "Which subjects does Class Companion support?",
      answer:
        "You can use Class Companion for any subject with written assignments. This includes, but isn’t limited to, English, Social Studies, Science, and World Languages.",
    },
    // Add more FAQs here
  ];

  // State to track open/closed state of each FAQ
  const [openIndex, setOpenIndex] = useState(null);

  // Function to toggle the dropdown state of an FAQ
  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mt-10 rounded-lg p-20 dark:bg-green-900">
      <h1
        className="text-4xl font-bold text-center text-white p-20"
        style={{
          fontFamily: "lobster, cursive",
        }}
      >
        {" "}
        Frequently Asked Questions
      </h1>
      {faqs.map((faq, index) => (
        <div key={faq.id} className=" text-white mb-4 border-b border-gray-400">
          <div
            className="flex items-center justify-between p-4 cursor-pointer"
            onClick={() => toggleDropdown(index)}
          >
            <h3 className="text-2xl font-semibold">{faq.question}</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 ${
                openIndex === index ? "transform rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={openIndex === index ? "M19 9l-7 7-7-7" : "M9 5l7 7 7-7"}
              />
            </svg>
          </div>
          {openIndex === index && (
            <div className="pt-10 pb-10 pl-5 pr-5 border-t-4 border-yellow-600">
              <p className="text-xl">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Faqs;
