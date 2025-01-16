// import React from "react";
// import { Field } from "formik";

// // Helper component to render different types of form fields
// const FormField = ({
//   id,
//   name,
//   label,
//   type = "text",
//   placeholder = "",
//   rows = 2,
//   accept,
//   setFieldValue,
// }) => (
//   <div>
//     <label
//       htmlFor={id}
//       className="block text-lg font-medium text-gray-700 mb-1"
//     >
//       {label}
//     </label>
//     {type === "file" ? (
//       <input
//         type={type}
//         accept={accept}
//         id={id}
//         className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 cursor-pointer"
//         onChange={(event) => setFieldValue(name, event.target.files[0])}
//       />
//     ) : type === "textarea" ? (
//       <Field
//         as="textarea"
//         id={id}
//         name={name}
//         placeholder={placeholder}
//         className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//         rows={rows}
//       />
//     ) : (
//       <Field
//         id={id}
//         name={name}
//         placeholder={placeholder}
//         className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//       />
//     )}
//   </div>
// );

// export default FormField;
