const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const configuredModel = process.env.GEMINI_MODEL;
const models = [
    configuredModel || "gemini-3.5-flash-lite",
    "gemini-flash-lite-latest",
].filter((value, index, list) => list.indexOf(value) === index);
const transientStatuses = new Set([429, 500, 503, 504]);

async function extractProfile(message) {

    const prompt = `
You are the profile extraction assistant for Sahayak, an Indian government
benefit discovery application.

Extract ONLY information explicitly provided by the user.

Do NOT guess or invent information.

Return ONLY valid JSON with exactly these fields:

{
  "age": null,
  "gender": null,
  "marital_status": null,
  "location": null,
  "monthly_income": null,
  "children_count": null,
  "children_are_students": null,
  "is_student": null,
  "has_disability": null,
  "disability_percentage": null,
  "landholding_farmer": null,
  "poor_household": null,
  "existing_lpg_connection_in_household": null,
  "has_pucca_house": null
}

Rules:
- Use null when the user did not provide the information.
- age must be a number.
- monthly_income must be a number in Indian rupees per month.
- children_count must be a number.
- disability_percentage must be a number.
- gender should be "male", "female", or "other".
- Do not infer gender from names.
- Do not infer income from occupation.
- Do not infer whether someone is poor.
- Do not infer whether someone owns a house.
- Do not infer whether someone is a farmer.
- Do not infer whether their household has LPG.
- Do not infer disability status.

User message:
${message}
`;

    let lastError;

    for (const model of models) {
        for (let attempt = 0; attempt < 2; attempt += 1) {
            try {
                const response = await ai.models.generateContent({
                    model,
                    contents: prompt,
                    config: {
                        responseMimeType: "application/json"
                    }
                });

                return JSON.parse(response.text);
            } catch (error) {
                lastError = error;
                const status = error?.status || error?.error?.code;

                if (!transientStatuses.has(Number(status))) {
                    break;
                }

                await new Promise((resolve) => {
                    setTimeout(resolve, 500 * 2 ** attempt);
                });
            }
        }
    }

    throw lastError;
}

module.exports = {
    extractProfile
};