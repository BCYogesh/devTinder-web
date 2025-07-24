export const BASE_URL = location.hostname === "localhost" ? "http://localhost:3000" : "https://devtinder-oeoo.onrender.com";


export const extractISTTime = (fullDate) => {
    const createdTime = new Date(fullDate);
    const istTime = createdTime.toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
    return istTime;
};

