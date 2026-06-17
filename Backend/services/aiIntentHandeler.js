import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";
import { getAvailableSlots } from "../utils/slotgenerator.js";
import { findNearestSlot } from "../utils/nearestSlot.js";
import { createAppointment } from "./appointmentServices.js";
import { resolveDate } from "../utils/resolveDate.js";
import { resolveTime } from "../utils/resolveTime.js";

const handleIntent = async (parsedResponse, userId) => {
    const { intent, doctorId, doctorName, speciality, date, time, timePeriod } = parsedResponse;

    switch (intent) {

        case "view_doctor": {

            console.log("Searching for:", doctorName);

            const doctors = await doctorModel.find({
                name: {
                    $regex: doctorName,
                    $options: "i"
                }
            });

            console.log("Doctors Found:", doctors);

            console.log(
                "Matched doctors:",
                doctors.map(doc => doc.name)
            );

            if (doctors.length === 0) {
                return {
                    success: true,
                    aiResponse: {
                        reply: "Sorry, I could not find that doctor."
                    }
                };
            }

            // Multiple matching doctors
            if (doctors.length > 1) {
                return {
                    success: true,
                    aiResponse: {
                        reply: "I found multiple doctors. Please select one.",
                        doctors: doctors.map(doc => ({
                            id: doc._id,
                            name: doc.name,
                            speciality: doc.speciality,
                            experience: doc.experience,
                            fees: doc.fees,
                            available: doc.available
                        }))
                    }
                };
            }

            const doctor = doctors[0];

            return {
                success: true,
                aiResponse: {
                    reply: "Doctor details:",
                    doctor: {
                        id: doctor._id,
                        name: doctor.name,
                        speciality: doctor.speciality,
                        degree: doctor.degree,
                        experience: doctor.experience,
                        fees: doctor.fees,
                        available: doctor.available,
                        about: doctor.about,
                        address: doctor.address,
                        image: doctor.image
                    }
                }
            };
        }

        case "view_doctors": {

            const query = {};

            if (speciality) {
                query.speciality = { $regex: speciality, $options: "i" };
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
                    reply: `I found ${doctorsList.length} doctor(s):`,
                    doctors: doctorsList.map(doc => ({
                        id: doc._id,
                        name: doc.name,
                        speciality: doc.speciality,
                        experience: doc.experience,
                        fees: doc.fees,
                        available: doc.available,
                        image: doc.image
                    }))
                }
            };
        }


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

            if (!date) {
                return {
                    success: true,
                    aiResponse: {
                        reply: "Which date would you like to book the appointment?"
                    }
                };
            }

            // Generate available slots
            const availableSlots = getAvailableSlots(doctor2);


            // finding suitable booking date 
            let bookingDate = date;

            const resolvedDate = date ? resolveDate(date) : null;

            if (resolvedDate) {
                bookingDate = resolvedDate;
            }

            console.log("Resolved Date:", bookingDate);

            // finding suitable booking time 

            if (!time && !timePeriod) {
                return {
                    success: true,
                    aiResponse: {
                        reply:
                            "What time would you prefer? You can specify a time like 15:30 or a period such as morning, afternoon, evening, or night."
                    }
                };
            }

            let bookingTime = time;

            if (!bookingTime && timePeriod) {

                const suggestedSlot = resolveTime(timePeriod, availableSlots, bookingDate);

                if (!suggestedSlot) {

                    return {
                        success: true,
                        aiResponse: {
                            reply: `No slots available in the ${timePeriod}.`
                        }
                    };
                }

                bookingTime = suggestedSlot.slotTime;
            }




            const isValidSlot = availableSlots.some(
                slot =>
                    slot.slotDate === bookingDate &&
                    slot.slotTime === bookingTime
            );

            // Invalid slot → suggest nearest slot
            if (!isValidSlot) {


                const nearestSlot = findNearestSlot(
                    bookingDate,
                    bookingTime,
                    availableSlots
                );

                if (!nearestSlot) {
                    return {
                        success: true,
                        aiResponse: {
                            reply: "No available slots found for that date."
                        }
                    };
                }

                return {
                    success: true,
                    aiResponse: {
                        reply:
                            `${bookingTime} is not available.  Nearest available slot is ${nearestSlot.slotTime}.
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
                bookingDate,
                bookingTime
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

            const user2 = await userModel.findById(userId);

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

        case "view_appointments": {

            const appointments = await appointmentModel
                .find({
                    userId,
                    cancelled: false
                })
                .sort({ slotDate: 1 });

            if (appointments.length === 0) {
                return {
                    success: true,
                    aiResponse: {
                        reply: "You don't have any upcoming appointments."
                    }
                };
            }

            return {
                success: true,
                aiResponse: {
                    reply: `You have ${appointments.length} upcoming appointment(s).`,
                    appointments: appointments.map(app => ({
                        id: app._id,
                        doctorName: app.docData.name,
                        speciality: app.docData.speciality,
                        date: app.slotDate,
                        time: app.slotTime,
                        amount: app.amount
                    }))
                }
            };
        }

        case "cancel_appointment":

            const appointments = await appointmentModel.find({ userId, cancelled: false });
            let filteredAppointments = appointments;

            if (doctorName) {

                filteredAppointments = appointments.filter(
                    app =>
                        app.docData.name
                            .toLowerCase()
                            .includes(
                                doctorName.toLowerCase()
                            )
                );


            }

            if (date) {
                const resolvedDate = resolveDate(date);

                filteredAppointments = filteredAppointments.filter(
                    app => app.slotDate === resolvedDate
                );

            }

            if (filteredAppointments.length === 0) {
                return {
                    success: true,
                    aiResponse: {
                        reply: "You don't have any active appointment "
                    }
                };
            }

            return {
                success: true,
                aiResponse: {
                    reply: "Which appointment would you like to cancel?",
                    appointments: filteredAppointments.map(app => ({
                        id: app._id,
                        doctorName: app.docData.name,
                        speciality: app.docData.speciality,
                        date: app.slotDate,
                        time: app.slotTime,
                        amount: app.amount,
                        cancelled: app.cancelled
                    }))
                }
            };

        case "symptom_consultation": {

            const doctors = await doctorModel.find({ speciality: parsedResponse.speciality });

            return {
                success: true,
                aiResponse: {
                    reply: parsedResponse.reply,
                    doctors: doctors.map(doc => ({
                        id: doc._id,
                        name: doc.name,
                        speciality: doc.speciality,
                        experience: doc.experience,
                        fees: doc.fees,
                        available: doc.available,
                    }))
                }
            };
        }

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