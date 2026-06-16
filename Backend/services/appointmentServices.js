import appointmentModel from "../models/appointmentModel.js";
import doctorModel from "../models/doctorModel.js";

export const createAppointment = async (
    user,
    doctor,
    slotDate,
    slotTime
) => {

    // Doctor availability check
    if (!doctor.available) {
        return {
            success: true,
            aiResponse: {
                reply: `${doctor.name} is currently unavailable for appointments.`
            }
        };
    }

    const slots_booked = doctor.slots_booked || {};

    // Slot already booked check
    if (
        slots_booked[slotDate] &&
        slots_booked[slotDate].includes(slotTime)
    ) {
        return {
            success: true,
            aiResponse: {
                reply: `The slot ${slotTime} on ${slotDate} is already booked for Dr. ${doctor.name}. Please choose another slot.`
            }
        };
    }

    // Create appointment
    const appointmentData = {
        userId: user._id,

        docId: doctor._id,

        slotDate,

        slotTime,

        userData: user,

        docData: doctor,

        amount: doctor.fees,

        date: Date.now()
    };

    await appointmentModel.create(
        appointmentData
    );

    // Update doctor's booked slots
    if (slots_booked[slotDate]) {

        slots_booked[slotDate].push(
            slotTime
        );

    } else {

        slots_booked[slotDate] = [
            slotTime
        ];
    }

    await doctorModel.findByIdAndUpdate(
        doctor._id,
        {
            $set: {
                slots_booked
            }
        }
    );

    return {
        success: true,
        aiResponse: {
            reply: `Appointment booked successfully with ${doctor.name}`
        }
    };
};