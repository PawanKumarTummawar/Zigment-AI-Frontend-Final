import React from 'react';

const FormPreview = ({ jsonSchema }) => {
  const renderField = (field) => {
    switch (field.type) {
      case 'text':
      case 'email':
        return (
          <div className="mb-4" key={field.id}>
            <label htmlFor={field.id} className="block text-gray-700">{field.label}</label>
            <input
              type={field.type}
              id={field.id}
              placeholder={field.placeholder}
              required={field.required}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
        );
      case 'select':
        return (
          <div className="mb-4" key={field.id}>
            <label htmlFor={field.id} className="block text-gray-700">{field.label}</label>
            <select
              id={field.id}
              required={field.required}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            >
              {field.options.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        );
      case 'radio':
        return (
          <div className="mb-4" key={field.id}>
            <label className="block text-gray-700">{field.label}</label>
            {field.options.map((option, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="radio"
                  id={option.value}
                  name={field.id}
                  value={option.value}
                  required={field.required}
                  className="mr-2"
                />
                <label htmlFor={option.value}>{option.label}</label>
              </div>
            ))}
          </div>
        );
      case 'textarea':
        return (
          <div className="mb-4" key={field.id}>
            <label htmlFor={field.id} className="block text-gray-700">{field.label}</label>
            <textarea
              id={field.id}
              placeholder={field.placeholder}
              required={field.required}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <form>
      {jsonSchema.fields && jsonSchema.fields.map(field => renderField(field))}
      <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default FormPreview;
