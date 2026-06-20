import { GoogleGenAI } from '@google/genai';
import systemPrompt from '../config/prompts/systemPrompt.js';
import doctorModel from '../models/doctorModel.js';
import jsonSchemaPrompt from '../config/prompts/jsonSchemaPrompt.js';
import handleIntent from '../services/aiIntentHandeler.js';
import appointmentModel from '../models/appointmentModel.js';


// Initializing the Google Gen AI SDK with  environment key

if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY missing");
}
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });


const chatWithGemini = async (req, res) => {

    try {

        const { messages } = req.body;

        if (!messages || messages.length === 0) {
            return res.json({ success: false, message: "Please provide a prompt message." });
        }

        const conversationHistory = messages.slice(-10)
            .filter(
                msg =>
                    msg.content !== "Hello! I'm HealthNest AI. How can I help you today?"
            )
            .map((msg) =>
                `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`
            )
            .join("\n");

        const doctors = await doctorModel.find(
            {},
            "name speciality degree experience fees available about"
        );
        const doctorContext = doctors.map((doctor) => `
                Name: ${doctor.name}
                Speciality: ${doctor.speciality}
                Degree: ${doctor.degree}
                Experience: ${doctor.experience}
                Consultation Fee: ₹${doctor.fees}
                Available: ${doctor.available ? "Yes" : "No"}
                `
        )
            .join("\n");


        const finalPrompt = `
                ${systemPrompt}

                ${jsonSchemaPrompt}

                Available Doctors:

                ${doctorContext}

                Conversation History:

                ${conversationHistory}
            `;


        //Call the foundational Gemini 2.5 Flash model

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: finalPrompt,
        });

        let parsedResponse;

        try {
            parsedResponse = JSON.parse(response.text);

        }
        catch (error) {

            console.error("JSON Parse Error:", error);

            return res.json({
                success: false,
                message: "AI returned an invalid response. Please try again."
            });
        }

        // const parsedResponse = {
        //     intent: "book_appointment",
        //     doctorName: "Christopher",
        //     date: "22 June",
        //     time: "10:38",
        //     timePeriod: null
        // };


        const result = await handleIntent(parsedResponse, req.userId);

        res.json(result);


    } catch (error) {
        console.error(error);

        if ( error.status === 429 || error.message?.includes("RESOURCE_EXHAUSTED")) 
        {
            return res.json({
                success: true,
                aiResponse: {
                    reply:
                        "I'm currently unavailable. Please try again in a little while."
                }
            });
        }

        return res.json({
            success: false,
            message: "Something went wrong."
        });
    }
};

const confirmBooking = async (req, res) => {

    try {

        const { pendingBooking } = req.body;

        const result = await handleIntent(
            {
                intent: "confirm_booking",
                doctorId: pendingBooking.doctorId,
                date: pendingBooking.slotDate,
                time: pendingBooking.slotTime
            },
            req.userId
        );

        return res.json(result);

    } catch (error) {

        console.log(error);

        return res.json({
            success: false,
            message: "Something went wrong."
        });
    }
};

const confirmCancellation = async (req, res) => {
    try {
        const { appointmentId } = req.body;

        const appointment = await appointmentModel.findById(appointmentId);

        if (appointment.userId.toString() !== req.userId) {
            return res.json({
                success: false,
                message: "Unauthorized"
            });
        }

        if (!appointment) {
            return res.json({
                success: false,
                message: "Appointment not found."
            });
        }

        appointment.cancelled = true;
        await appointment.save();

        return res.json({
            success: true,
            aiResponse: {
                reply: "Appointment cancelled successfully."
            }
        });

    } catch (error) {
        console.log(error);

        return res.json({
            success: false,
            message: "Something went wrong."
        });
    }
};

export { chatWithGemini, confirmBooking, confirmCancellation };