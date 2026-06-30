import * as chrono from "chrono-node";

export const resolveDate = (dateText) => {

    if (!dateText || typeof dateText !== "string") {
        return null;
    }

    const parsedDate = chrono.parseDate(
        dateText.trim(),
        new Date(),
        {
            forwardDate: true
        }
    );

    if (!parsedDate) {
        return null;
    }

    const day = parsedDate.getDate();
    const month = parsedDate.getMonth() + 1;
    const year = parsedDate.getFullYear();

    return `${day} ${month} ${year}`;
};