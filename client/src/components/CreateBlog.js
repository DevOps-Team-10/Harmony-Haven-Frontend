import React, { useState, useContext } from 'react';
import UserContext from '../context/UserContext.js';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { user } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!title || !content) {
        console.error('Please enter both title and content.');
        return;
      }

      const res = await fetch("/blogs", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.accessToken}`
        },
        body: JSON.stringify({ title, content })
      });

      if (res.ok) {
        setSuccessMessage('Blog created successfully!');

        // Clear the form fields after successful submission
        setTitle('');
        setContent('');

        // Reload the page after showing the success message
        // setTimeout(() => {
        //   window.location.reload();
        // }, 1000); // Reload after 1 second
      } else {
        console.error('Failed to create blog:', res.statusText);
      }
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter title"
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="content" className="block text-gray-700 font-bold mb-2">
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="shadow appearance-none border rounded w-full h-32 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter content"
          required
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create
        </button>
      </div>
      {successMessage && (
        <div className="text-green-600 mt-2">{successMessage}</div>
      )}
    </form>
  );
};

export default CreateBlog;
