import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key as an environment variable
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// Function to evaluate coding-based assignments
export const evaluateCodingAssignment = async (
  submissionText,
  assignmentText,
  testCasesText
) => {
  try {
    console.log("Evaluating coding assignment for submission:", submissionText);

    // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Constructing the prompt using submission text, assignment text, and test cases text
    const prompt = `I want you to evaluate this coding assignment of a student who submitted to the teacher. 
    The assignment question is: '${assignmentText}'. 
    The student solution is: '${submissionText}'. 
    And these are the test cases on the basis of which you should mark the assignment: ${testCasesText}.
    For each test case, indicate whether the student's solution passed or failed.
    Finally, give an overall score for the student's assignment between 3 to 10. 
    The format of your response should be as follows:
    - Test Case 1: (Input, Expected Output, Student Output, Pass/Fail, Explanation)
    - Test Case 2: (Input, Expected Output, Student Output, Pass/Fail, Explanation)
    - ...
    Overall Score: (8.5)
    Ensure there is no text after 'Overall Score: (8.5)' as I need to fetch that number from your response.`;

    // Generating content based on the constructed prompt
    const result = await model.generateContent(prompt);
    const response = result.response;
    const feedback = response.text();

    console.log("Feedback generated successfully:", feedback);

    // Extract the score using a regular expression
    const scoreMatch = feedback.match(/Overall Score:\s*\((\d+(\.\d+)?)\)/);
    console.log("Score match:", scoreMatch);
    const score = scoreMatch ? parseFloat(scoreMatch[1]) : 0;
    console.log("Score:", score);

    return { feedback, score };
  } catch (error) {
    console.error("Error generating feedback:", error);
    return { feedback: "Error generating feedback", score: 0 };
  }
};
