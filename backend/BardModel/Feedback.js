import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

export const generateFeedback = async (
  submissionText,
  assignmentText,
  rubricText
) => {
  try {
    console.log("Generating feedback for submission:", submissionText);

    // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Constructing the prompt using submission text, assignment text, and rubric text
    const prompt = `I want you to evaluate this assignment of a student who submitted to the teacher. 
    Mark it explicitly between 3 to 10. The assignment question is: '${assignmentText}'. 
    The student solution is: '${submissionText}'. 
    And this is the rubric on the basis of which you mark the assignment: ${rubricText}.
    Give me the overall Score of the student assignment at the end of your feedback. As i have to fetch that number from your 
    response make sure the format you give me result is like that Overall Score: (8.5) There should be not text after that.`;

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
