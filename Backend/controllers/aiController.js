import { GoogleGenAI } from '@google/genai';
import systemPrompt from '../config/prompts/systemPrompt.js';
import doctorModel from '../models/doctorModel.js';

// Initialize the Google Gen AI SDK with your protected environment key
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });



const chatWithGemini = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.json({ success: false, message: "Please provide a prompt message." });
        }

        // Call the foundational Gemini 2.5 Flash model
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: message,
        });

        // Send the generated text back to your React application
        res.json({
            success: true,
            reply: response.text
        });

    } catch (err) {
        console.error("Gemini API Error:", err);
        res.json({ success: false, message: err.message });
    }
};

export { chatWithGemini };