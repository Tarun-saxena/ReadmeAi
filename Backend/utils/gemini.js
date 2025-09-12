import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

const modelName = "gemini-1.5-flash"; 

export async function generateReadme(repoData) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set. Please add your Gemini API key to the .env file.");
  }
  
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: modelName });
  
  const prompt = `
Generate a comprehensive, professional README.md file for the following GitHub repository:
Please create a README that includes ALL of the following sections:

1. **Project Title** - Use the repository name as the main heading
2. **Description** - Write a clear, engaging description of what the project does
3. **Features** - List key features and functionality (even if you need to infer them)
4. **Tech Stack** - Identify and list the technologies used based on the repository language and details
5. **Installation Guide** - Provide step-by-step installation instructions
6. **Usage** - Show how to use the project with examples if possible
7. **Project Structure** - Provide a basic project structure overview
8. **Contributing** - Add a contributing section
9. **License** - Include license information based on the repository data
10. **Contact/Author** - Include author information if available

Requirements:
- Use proper Markdown formatting
- Make it professional and well-structured
- If information is missing, make reasonable inferences based on the repository data
- Include badges if appropriate (build status, license, etc.)
- Make the README comprehensive and ready to use
- Ensure all sections are complete (don't leave any sections empty)

Repository Information Available:
- Name: ${repoData.name}
- Description: ${repoData.description || 'No description provided'}
- Language: ${repoData.language || 'Not specified'}
- URL: ${repoData.html_url}
- Stars: ${repoData.stargazers_count}
- License: ${repoData.license?.name || 'Not specified'}
- Owner: ${repoData.owner?.login}

Generate a complete, professional README.md:
`;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Gemini API error:', error);
    throw new Error(`Failed to generate README: ${error.message}`);
  }
}
