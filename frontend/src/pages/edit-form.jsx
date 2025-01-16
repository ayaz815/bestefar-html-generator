import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Formik, Form, Field } from "formik";

const EditForm = () => {
  const { formId } = useParams(); // Get the form ID from the URL
  const history = useHistory();

  // Example forms (you would normally fetch this data from a database)
  const allForms = [
    { id: 1, quizName: "Music Quiz 1", question: "What is the song?" },
    { id: 2, quizName: "Music Quiz 2", question: "What is the artist?" },
    { id: 3, quizName: "Music Quiz 3", question: "What is the genre?" },
  ];

  // Find the specific form by ID
  const form = allForms.find((form) => form.id === parseInt(formId));

  // Handle form submission (could be saving to a database or updating state)
  const handleSave = (values) => {
    console.log("Updated Form Data:", values);
    alert("Form updated successfully!");
    history.push("/"); // Navigate back to the form list page
  };

  if (!form) {
    return <div>Form not found.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 min-h-screen">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-xl">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Edit {form.quizName}
        </h1>

        <Formik initialValues={form} onSubmit={(values) => handleSave(values)}>
          <Form className="space-y-5">
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
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

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
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
                rows={2}
              />
            </div>

            <div className="flex justify-between items-center mt-6">
              <button
                type="submit"
                className="px-5 py-2 text-white font-semibold bg-indigo-500 rounded-md shadow hover:bg-indigo-600"
              >
                Save Changes
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default EditForm;
