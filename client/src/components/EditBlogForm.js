import React, { useState } from 'react';

const EditBlogForm = ({ titl, conten, onUpdate, onCancel }) => {
    const [formData, setFormData] = useState({
        updatedTitle: titl,
        updatedContent: conten
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(formData);
    };

    return (
        <div className="mt-4">
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="updatedTitle" className="block text-gray-700 font-bold mb-2">Title</label>
                    <input
                        type="text"
                        id="updatedTitle"
                        name="updatedTitle"
                        value={formData.updatedTitle}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="updatedContent" className="block text-gray-700 font-bold mb-2">Content</label>
                    <textarea
                        id="updatedContent"
                        name="updatedContent"
                        value={formData.updatedContent}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-40 resize-none"
                    ></textarea>
                </div>
                <div className="flex justify-between">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
                    <button type="button" onClick={onCancel} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default EditBlogForm;
