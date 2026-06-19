export const findNearestSlot = ( date, time, availableSlots ) => {

    const [hours, minutes] =
        time.split(":").map(Number);

    const userMinutes =
        hours * 60 + minutes;

    let nearestSlot = null;
    let smallestDifference = Infinity;

    for (const slot of availableSlots) {

        if (slot.slotDate !== date) continue;

        const [slotHour, slotMinute] =
            slot.slotTime.split(":").map(Number);

        const slotMinutes =
            slotHour * 60 + slotMinute;

        const difference =
            Math.abs(slotMinutes - userMinutes);

        if (difference < smallestDifference) {

            smallestDifference = difference;

            nearestSlot = slot;
        }
    }

    return nearestSlot;
};