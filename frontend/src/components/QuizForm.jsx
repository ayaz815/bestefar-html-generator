/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";

const QuizForm = () => {
  const [page, setPage] = useState(1); // Track the current page
  const [formStates, setFormStates] = useState([
    {
      quizName: "",
      firmNaming: "music",
      mp3File: null,
      question: "",
      answer: "",
    },
  ]);

  const handleMp3Upload = (setFieldValue, event) => {
    const file = event.target.files[0]; // Get the uploaded file
    setFieldValue("mp3File", file); // Store the file in the current form state
  };

  console.log("Updated formStates:", formStates);

  const handleSave = async (values, currentPage) => {
    const updatedForms = [...formStates];
    updatedForms[currentPage - 1] = values; // Save current form data to state
    setFormStates(updatedForms); // Update state with the saved form

    try {
      const formData = new FormData();
      formData.append("quizName", values.quizName);
      formData.append("firmNaming", values.firmNaming);
      formData.append("question", values.question);
      formData.append("answer", values.answer);

      if (values.mp3File) {
        formData.append("musicFile", values.mp3File); // Append MP3 file

        // Upload music file dynamically based on page number
        await axios.post(
          `https://bestefar-html-generator-kr5n.vercel.app/upload-music/${currentPage}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        alert(`Music file for page ${currentPage} replaced successfully!`);
      } else {
        alert("No music file uploaded!");
      }
    } catch (error) {
      console.error("Error saving form data:", error);
      alert("Failed to save form data. Please try again.");
    }
  };

  // Handle page navigation
  const handlePageChange = (direction) => {
    const newPage = page + direction;

    // Add a new form state for the next page if it doesn't exist
    if (newPage > formStates.length) {
      setFormStates((prev) => [
        ...prev,
        {
          quizName: "",
          firmNaming: "music",
          mp3File: null,
          question: "",
          answer: "",
        },
      ]);
    }

    setPage(newPage); // Update the page
  };

  const handleExportZip = async () => {
    try {
      const response = await axios.get("https://bestefar-html-generator-kr5n.vercel.app/download-zip", {
        responseType: "blob", // Ensure we get the file as a blob
      });

      // Create a download link for the ZIP file and trigger the download
      const blob = response.data;
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "html_project.zip";
      link.click();
    } catch (error) {
      console.error("Error exporting ZIP:", error);
      alert("Failed to export ZIP. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex-grow">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-xl">
        {/* Navigation Arrows */}
        <div className="flex justify-between items-center mb-4">
          <button
            disabled={page === 1}
            onClick={() => handlePageChange(-1)}
            className={`px-4 py-2 bg-gray-300 rounded-md shadow ${
              page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-400"
            }`}
          >
            &#8592; Previous
          </button>
          <span className="text-lg font-semibold text-gray-700">
            Page {page}
          </span>
          <button
            onClick={() => handlePageChange(1)}
            className="px-4 py-2 bg-gray-300 rounded-md shadow hover:bg-gray-400"
          >
            Next &#8594;
          </button>
        </div>

        <Formik
          initialValues={
            formStates[page - 1] || {
              quizName: "",
              firmNaming: "music",
              mp3File: null,
              question: "",
              answer: "",
            }
          }
          enableReinitialize // Ensure values are synced with formStates on navigation
          onSubmit={(values) => handleSave(values, page)}
        >
          {({ setFieldValue, values }) => (
            <Form className="space-y-5">
              {/* Name of Quiz */}
              <div>
                <label
                  htmlFor="quizName"
                  className="block text-lg font-medium text-gray-700 mb-1"
                >
                  Name of Quiz
                </label>
                <Field
                  id="quizName"
                  name="quizName"
                  placeholder="Enter quiz name"
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Firm Naming */}
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-1">
                  Select music type
                </label>
                <div className="flex items-center justify-between">
                  {["music", "saying", "sound"].map((option) => (
                    <label
                      key={option}
                      className="flex items-center text-gray-600"
                    >
                      <Field
                        type="radio"
                        name="firmNaming"
                        value={option}
                        className="mr-2 focus:ring-indigo-500 cursor-pointer"
                      />
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </label>
                  ))}
                </div>
              </div>

              {/* MP3 File Upload */}
              <div>
                <label
                  htmlFor="mp3File"
                  className="block text-lg font-medium text-gray-700 mb-1"
                >
                  Upload MP3 File
                </label>
                <div className="relative">
                  <label
                    htmlFor="mp3File"
                    className="inline-block px-5 py-2 bg-indigo-500 text-white font-semibold text-center rounded-md cursor-pointer hover:bg-indigo-600 focus:ring-4 focus:ring-indigo-300"
                  >
                    Choose File
                  </label>
                  <input
                    type="file"
                    accept=".mp3"
                    id="mp3File"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={(event) => {
                      const file = event.target.files[0];
                      if (file) {
                        setFieldValue("mp3File", file); // Update Formik state only
                      }
                    }}
                  />
                </div>

                {/* Display Selected File Name */}
                {values.mp3File ? (
                  <p className="text-sm text-gray-600 mt-1">
                    Selected file: {values.mp3File.name}
                  </p>
                ) : (
                  <p className="text-sm text-gray-600 mt-1">No file selected</p>
                )}
              </div>

              {/* Question */}
              <div>
                <label
                  htmlFor="question"
                  className="block text-lg font-medium text-gray-700 mb-1"
                >
                  Question
                </label>
                <Field
                  as="textarea"
                  id="question"
                  name="question"
                  placeholder="Enter the question"
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  rows={2}
                />
              </div>

              {/* Answer */}
              <div>
                <label
                  htmlFor="answer"
                  className="block text-lg font-medium text-gray-700 mb-1"
                >
                  Answer
                </label>
                <Field
                  as="textarea"
                  id="answer"
                  name="answer"
                  placeholder="Enter the answer"
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  rows={2}
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-between items-center mt-6">
                <button
                  type="submit"
                  className="px-5 py-2 text-white font-semibold bg-indigo-500 rounded-md shadow hover:bg-indigo-600 focus:ring-4 focus:ring-indigo-300"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleExportZip}
                  className="px-5 py-2 text-white font-semibold bg-[#FFC000] rounded-md shadow hover:bg-[#FFC000] focus:ring-4 focus:ring-[#FFC000]-300"
                >
                  Export ZIP
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default QuizForm;
