import React, { useState } from "react";
import { useHistory } from "react-router-dom"; // If you're using React Router
import { Link } from "react-router-dom"; // For navigation

const FormList = () => {
  // Example saved forms (ideally, this would come from state or an API)
  const [forms, setForms] = useState([
    { id: 1, quizName: "Music Quiz 1" },
    { id: 2, quizName: "Music Quiz 2" },
    { id: 3, quizName: "Music Quiz 3" },
    // Add more forms as necessary
  ]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        All Saved Quizzes
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {forms.map((form) => (
          <div
            key={form.id}
            className="bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition duration-300"
          >
            <h3 className="text-lg font-semibold text-gray-800">
              {form.quizName}
            </h3>
            <Link
              to={`/edit-form/${form.id}`} // Navigate to edit form page
              className="text-indigo-500 hover:underline mt-2 block"
            >
              Edit
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormList;
