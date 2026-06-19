export const resolveTime = ( period, availableSlots, date ) => {

    let startHour;
    let endHour;

    switch (
        period?.toLowerCase()
    ) {

        case "morning":
            startHour = 10;
            endHour = 12;
            break;

        case "afternoon":
            startHour = 12;
            endHour = 17;
            break;

        case "evening":
            startHour = 17;
            endHour = 20;
            break;

        case "night":
            startHour = 20;
            endHour = 21;
            break;

        default:
            return null;
    }

    return availableSlots.find(
        slot => {

            if ( slot.slotDate !== date) 
                return false;

            const hour = Number( slot.slotTime .split(":")[0] );

            return (
                hour >= startHour &&
                hour < endHour
            );
        }
    );
};