import moment from "moment";

// Function to make the file in the certain format
const fileFormat = (url = "") => {

    // extension of the file
    const fileExtension = url.split(".").pop();

    // VIDEO FORMAT
    if (fileExtension === "mp4" || fileExtension === "webm" || fileExtension === "ogg") {
        return "video"
    }

    // AUDIO FORMAT
    if (fileExtension === "mp3" || fileExtension === "wav") {
        return "audio"
    }

    // IMAGE
    if (fileExtension === "png" || fileExtension === "jpeg" || fileExtension === "hief" || fileExtension === "jpg" || fileExtension === "gif") {
        return "image"
    }

    // DEFAULT
    return "file";
}


// URL TRANSFORMATION...
// https://res.cloudinary.com/dteqw6mgr/image/upload/v1719897771/15ecaff7-8497-4280-bde5-f44139dfcc0b.png
const transformImage = (url = "", width = 100) => {
    const urlString = String(url)

    // making the URL in rthe larger width
    const newURL = urlString.replace("upload/", `upload/dpr_auto/w_${width}/`)

    return newURL;
}


// Last 7 days data
const getLastSevenDaysData = () => {
    const currentDate = moment();

    const last7Days = []
    for (let i = 0; i < 7; i++) {
        const dayDate = currentDate.clone().subtract(i, "days");
        const dayName = dayDate.format("dddd")

        last7Days.unshift(dayName)
    }
    return last7Days;
}


// saving the newMessages in the localStorage
const getOrSaveFromStorage = ({ key, value, get }) => {
    if (get) {
        return (
            localStorage.getItem(key) ? (
                JSON.parse(localStorage.getItem(key))
            ) : (
                null
            )
        );
    } else {
        localStorage.setItem(key, JSON.stringify(value));
    }
}


export { fileFormat, transformImage, getLastSevenDaysData, getOrSaveFromStorage }