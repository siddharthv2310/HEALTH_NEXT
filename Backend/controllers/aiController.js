import { GoogleGenAI } from '@google/genai';
import systemPrompt from '../config/prompts/systemPrompt.js';
import doctorModel from '../models/doctorModel.js';
import jsonSchemaPrompt from '../config/prompts/jsonSchemaPrompt.js';
import handleIntent from '../services/aiIntentHandeler.js';
import appointmentModel from '../models/appointmentModel.js';

// Initialize the Google Gen AI SDK with your protected environment key
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });


const chatWithGemini = async (req, res) => {
    console.log("AI CONTROLLER HIT");
    try {

        const { messages } = req.body;

        if (!messages || messages.length === 0) {
            return res.json({ success: false, message: "Please provide a prompt message." });
        }

        const conversationHistory = messages
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

        // console.log(doctorContext);

        const finalPrompt = `
        ${systemPrompt}

        ${jsonSchemaPrompt}

        Available Doctors:

        ${doctorContext}

        Conversation History:

        ${conversationHistory}
        `;


        // Call the foundational Gemini 2.5 Flash model

        // const response = await ai.models.generateContent({
        //     model: "gemini-2.5-flash",
        //     contents: finalPrompt,
        // });
        // console.log("RAW GEMINI RESPONSE:");
        // console.log(response.text);

        // let parsedResponse;

        // try {
        //     parsedResponse = JSON.parse(response.text);
        //     console.log(parsedResponse);
        // }
        // catch (error) {

        //     console.log("JSON Parse Error:", error);

        //     return res.json({
        //         success: false,
        //         message: "AI returned an invalid response. Please try again."
        //     });
        // }

        // console.log(parsedResponse);

        const parsedResponse = {
            intent: "symptom_consultation",
            symptoms:"Skin itching"
            //speciality:"deter",
            //doctorName: "emily ",
            // date: "22 june",
            // time: null ,
            // timePeriod: morning
        };
        // Send the generated text back to your React application

        const result = await handleIntent(parsedResponse, req.userId);
        console.log(result);
        res.json(result);

        // res.json({
        //     success: true,
        //     reply: conversationHistory
        // });

    } catch (error) {
        console.error(error);

        if (error.status === 429) {
            return res.json({
                success: false,
                message:
                    "Daily AI quota exceeded. Please try again later."
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

export { chatWithGemini, confirmBooking,confirmCancellation };