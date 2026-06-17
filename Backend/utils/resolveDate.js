import * as chrono from "chrono-node";

export const resolveDate = (
    dateText
) => {

    const parsedDate = chrono.parseDate(dateText);

    if (!parsedDate) {
        return null;
    }

    const now = new Date();

    // user didn't specify year
    const yearSpecified =  /\b\d{4}\b/.test(dateText);

    if (!yearSpecified) {

        parsedDate.setFullYear(
            now.getFullYear()
        );

        if (parsedDate < now) {

            parsedDate.setFullYear(  now.getFullYear() + 1 );
        }
    }

    const day = parsedDate.getDate();

    const month = parsedDate.getMonth() + 1;

    const year = parsedDate.getFullYear();

    return `${day} ${month} ${year}`;
};