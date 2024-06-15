export const getReportBlobs = async (response, type) => {
    // console.log("Response:", response);
    // console.log("Type:", type);

    if (!response) {
        throw new Error("Response is undefined");
    }

    if (type === "EXCEL" || type === "WORD") {
        const blob = await response.blob();
        const link = document.createElement("a");
        // Set the download attribute with the desired file name
        link.download = `download.${type === "EXCEL" ? "xlsx" : "docx"}`;
        // Create a URL for the blob and set it as the link's href
        link.href = window.URL.createObjectURL(blob);
        // Append the link to the document
        document.body.appendChild(link);
        // Trigger a click on the link to start the download
        link.click();
        // Remove the link from the document
        document.body.removeChild(link);
    } else {
        const blob = await response.blob();
        const file = new Blob([blob], { type: "application/pdf" });
        return window.URL.createObjectURL(file);
    }
};