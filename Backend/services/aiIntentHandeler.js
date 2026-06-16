import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";
import { getAvailableSlots } from "../utils/slotgenerator.js";
import { findNearestSlot } from "../utils/nearestSlot.js";
import { createAppointment } from "./appointmentServices.js";

const handleIntent = async (parsedResponse, userId) => {
    const { intent, doctorId, doctorName, speciality, date, time } = parsedResponse;

    switch (intent) {

        case "view_doctor":

            const doctors = await doctorModel.find({
                name: {
                    $regex: doctorName,
                    $options: "i"
                }
            });

            // No doctor found
            if (doctors.length === 0) {
                return {
                    success: true,
                    aiResponse: {
                        reply: "Sorry, I could not find that doctor."
                    }
                };
            }

            // Multiple doctors found
            if (doctors.length > 1) {
                return {
                    success: true,
                    aiResponse: {
                        reply: "I found multiple doctors. Please select one.",
                        doctors: doctors.map(doc => ({
                            id: doc._id,
                            name: doc.name,
                            speciality: doc.speciality
                        }))
                    }
                };
            }

            // Single doctor found
            const doctor = doctors[0];

            return {
                success: true,
                aiResponse: {
                    reply: `
                            Name: ${doctor.name}

                            Speciality: ${doctor.speciality}

                            Degree: ${doctor.degree}

                            Experience: ${doctor.experience}

                            Consultation Fee: ₹${doctor.fees}

                            Availability: ${doctor.available
                            ? "Available"
                            : "Not Available"
                        }
                    `,
                    doctorId: doctor._id
                }
            };

        case "view_doctors":

            const query = {};

            if (speciality) {
                query.speciality = speciality;
            }

            const doctorsList = await doctorModel.find(query);

            if (doctorsList.length === 0) {
                return {
                    success: true,
                    aiResponse: {
                        reply: "No doctors found."
                    }
                };
            }

            return {
                success: true,
                aiResponse: {
                    reply: doctorsList.map(doc => `

                            Name: ${doc.name}
                            Speciality: ${doc.speciality}
                            Experience: ${doc.experience}
                            Fee: ₹${doc.fees}
                            Available: ${doc.available ? "Yes" : "No"}

                           `).join("\n\n")
                }
            };


        case "book_appointment":

            const doctor2 = await doctorModel.findOne({
                name: {
                    $regex: doctorName,
                    $options: "i"
                }
            });

            if (!doctor2) {
                return {
                    success: true,
                    aiResponse: {
                        reply: "Doctor not found."
                    }
                };
            }

            const user = await userModel.findById(userId);

            if (!user) {
                return {
                    success: false,
                    aiResponse: {
                        reply: "User not found. Please login again."
                    }
                };
            }

            // Generate available slots
            const availableSlots = getAvailableSlots(
                doctor2
            );

            const isValidSlot = availableSlots.some(
                slot =>
                    slot.slotDate === date &&
                    slot.slotTime === time
            );

            // Invalid slot → suggest nearest slot
            if (!isValidSlot) {

                
                const nearestSlot = findNearestSlot(
                        date,
                        time,
                        availableSlots
                    );

                return {
                    success: true,
                    aiResponse: {
                        reply:
                            `${time} is not available.  Nearest available slot is ${nearestSlot.slotTime}.
                            Would you like me to book it?`,

                        suggestedAction: {
                            type: "book_slot",
                            doctorId: doctor2._id,
                            doctorName: doctor2.name,
                            slotDate: nearestSlot.slotDate,
                            slotTime: nearestSlot.slotTime
                        }
                    }
                };
            }

            // Actual booking
            return await createAppointment(
                user,
                doctor2,
                date,
                time
            );


        case "confirm_booking":

            const doctor3 = await doctorModel.findById(
                doctorId
            );

            if (!doctor3) {
                return {
                    success: true,
                    aiResponse: {
                        reply: "Doctor not found."
                    }
                };
            }

            const user2 = await userModel.findById( userId );

            if (!user2) {
                return {
                    success: false,
                    aiResponse: {
                        reply: "User not found. Please login again."
                    }
                };
            }

            return await createAppointment(
                user2,
                doctor3,
                date,
                time
            );



        default:
            return {
                success: true,
                aiResponse: {
                    reply: parsedResponse.reply
                }
            };
    }
};

export default handleIntent;