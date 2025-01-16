// import axios from "axios";

// // Save form data to backend
// export const saveFormData = async (values) => {
//   try {
//     // Uncomment and replace the API URL with your actual endpoint
//     // await axios.post("http://localhost:3000/update-html", values);
//     alert("Form data saved successfully!");
//   } catch (error) {
//     console.error("Error updating HTML:", error);
//     alert("Failed to update HTML. Please try again.");
//   }
// };

// // Export project as ZIP file
// export const exportZip = async () => {
//   try {
//     const response = await axios.get("http://localhost:3000/download-zip", {
//       responseType: "blob",
//     });

//     const blob = response.data;
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = "html_project.zip";
//     link.click();
//   } catch (error) {
//     console.error("Error exporting ZIP:", error);
//     alert("Failed to export ZIP. Please try again.");
//   }
// };
