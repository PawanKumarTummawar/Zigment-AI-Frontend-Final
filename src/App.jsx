import React, { useState } from "react";
import Editor from "@monaco-editor/react";

function App() {
  const [jsonSchema, setJsonSchema] = useState({
    formTitle: "Contact Information",
    formDescription: "Please provide your contact details",
    fields: [
      {
        id: "name",
        type: "text",
        label: "Full Name",
        required: true,
        placeholder: "Enter your full name",
      },
      {
        id: "email",
        type: "email",
        label: "Email Address",
        required: true,
        placeholder: "you@example.com",
        validation: {
          pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
          message: "Please enter a valid email address",
        },
      },
      {
        id: "newsletter",
        type: "radio",
        label: "Subscribe to Newsletter",
        required: false,
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
      },
    ],
  });

  const [jsonError, setJsonError] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Collecting form data using FormData
    const formData = new FormData(e.target);
    const data = {};

    // Loop through the form data and populate the data object
    formData.forEach((value, key) => {
      data[key] = value;
    });

    // Log the form data to the console
    console.log(data);

    // Show alert after submitting
    alert("Form submitted successfully!");
  };

  const renderFields = () => {
    return jsonSchema.fields.map((field) => {
      if (field.type === "text" || field.type === "email") {
        return (
          <div key={field.id} className="mb-4">
            <label
              htmlFor={field.id}
              className="block text-sm font-medium text-gray-700"
            >
              {field.label}
            </label>
            <input
              type={field.type}
              id={field.id}
              name={field.id}
              required={field.required}
              placeholder={field.placeholder}
              pattern={field.validation?.pattern}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {field.validation?.message && (
              <p className="text-red-500 text-sm">{field.validation.message}</p>
            )}
          </div>
        );
      }

      if (field.type === "select") {
        return (
          <div key={field.id} className="mb-4">
            <label
              htmlFor={field.id}
              className="block text-sm font-medium text-gray-700"
            >
              {field.label}
            </label>
            <select
              id={field.id}
              name={field.id}
              required={field.required}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              {field.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        );
      }

      if (field.type === "radio") {
        return (
          <div key={field.id} className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              {field.label}
            </label>
            {field.options.map((option) => (
              <div key={option.value} className="mt-1">
                <input
                  type="radio"
                  id={`${field.id}-${option.value}`}
                  name={field.id}
                  value={option.value}
                  className="mr-2"
                />
                <label
                  htmlFor={`${field.id}-${option.value}`}
                  className="text-sm text-gray-700"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        );
      }

      if (field.type === "textarea") {
        return (
          <div key={field.id} className="mb-4">
            <label
              htmlFor={field.id}
              className="block text-sm font-medium text-gray-700"
            >
              {field.label}
            </label>
            <textarea
              id={field.id}
              name={field.id}
              required={field.required}
              placeholder={field.placeholder}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        );
      }

      return null;
    });
  };

  const handleEditorChange = (value) => {
    try {
      const parsedSchema = JSON.parse(value);
      setJsonSchema(parsedSchema);
      setJsonError(""); // Clear error message if JSON is valid
    } catch (error) {
      setJsonError("Invalid JSON: " + error.message);
    }
  };

  return (
    <div className="p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Panel - JSON Editor */}
        <div className="p-4 border border-gray-300">
          <h2 className="text-xl font-semibold mb-2">JSON Schema</h2>
          <Editor
            height="400px"
            defaultLanguage="json"
            value={JSON.stringify(jsonSchema, null, 2)}
            onChange={handleEditorChange}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              automaticLayout: true,
            }}
          />
          {jsonError && (
            <p className="text-red-500 mt-2">
              <strong>Error:</strong> {jsonError}
            </p>
          )}
        </div>

        {/* Right Panel - Form Preview */}
        <div className="p-4 border border-gray-300">
          <h2 className="text-xl font-semibold mb-2">{jsonSchema.formTitle}</h2>
          <p className="mb-4">{jsonSchema.formDescription}</p>
          <form onSubmit={handleSubmit}>
            {renderFields()}
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md w-full sm:w-auto"
              disabled={jsonError !== ""} // Disable submit if JSON is invalid
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
