export const getAvailableSlots = (doctor) => {

    let today = new Date();

    let availableSlots = [];

    for (let i = 0; i < 7; i++) {

        let currentDate = new Date(today);

        currentDate.setDate(today.getDate() + i);

        let endTime = new Date(today);

        endTime.setDate(today.getDate() + i);

        endTime.setHours(21,0,0,0);

        if (i === 0) {

            currentDate.setHours(
                currentDate.getHours() > 10
                    ? currentDate.getHours() + 1
                    : 10
            );

            currentDate.setMinutes(
                currentDate.getMinutes() > 30
                    ? 30
                    : 0
            );

        } else {

            currentDate.setHours(10);
            currentDate.setMinutes(0);
        }

        while (currentDate < endTime) {

            const formattedTime =
                currentDate.toLocaleTimeString(
                    'en-GB',
                    {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                    }
                );

            let day = currentDate.getDate();
            let month = currentDate.getMonth() + 1;
            let year = currentDate.getFullYear();

            const slotDate =
                `${day} ${month} ${year}`;

            const isSlotAvailable =
                !doctor?.slots_booked?.[slotDate]?.includes(
                    formattedTime
                );

            if (isSlotAvailable) {

                availableSlots.push({
                    slotDate,
                    slotTime: formattedTime
                });
            }

            currentDate.setMinutes(
                currentDate.getMinutes() + 30
            );
        }
    }

    return availableSlots;
};