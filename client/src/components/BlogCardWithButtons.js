import React, { useState, useContext } from 'react';
import UserContext from '../context/UserContext.js';
import EditBlogForm from './EditBlogForm.js'; // Import the edit form component

const BlogCardWithButtons = ({ title, content, likes, fullData }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
    const { user } = useContext(UserContext);
    
    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
    };

    const onDelete = async () => {
        try {
            const res = await fetch(`/blogs/${fullData._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.accessToken}`
                }
            });
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    }

    const onUpdate = () => {
        setIsEditing(true); // Set editing mode to true when the update button is clicked
    }

    const handleUpdate = async (updatedData) => {
        try {
            const res = await fetch(`/blogs/${fullData._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.accessToken}`
                },
                body: JSON.stringify({title: updatedData.updatedTitle, content: updatedData.updatedContent})
            });
            if (res.ok) {
                await fetch(`/blogs`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.accessToken}`
                    },
                });
                window.location.reload()
            } 
            else {
                console.error('Failed to update blog:', res.statusCode);
            }
        } catch (error) {
            console.error('Error updating blog:', error);
        }
    };

    return (
        <div className={`border p-4 mb-4 w-full ${isExpanded ? 'fixed top-0 left-0 w-full h-full flex justify-center items-center overflow-auto bg-gray-800 bg-opacity-80' : 'hover:shadow-md transition duration-300'}`}>
            <div className={`bg-white rounded-lg max-w-lg p-4 ${isExpanded ? 'w-full' : ''}`}>
                {!isExpanded && (
                    <div className="cursor-pointer" onClick={toggleExpansion}>
                        <h2 className="text-xl font-bold">{title}</h2>
                        <p className="mt-2">{content.substring(0, 100)}...</p>
                        <div className="flex justify-between items-center mt-4">
                            <button className="text-blue-500" onClick={toggleExpansion}>
                                Read More
                            </button>
                        </div>
                    </div>
                )}
                {isExpanded && (
                    <div>
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold">{title}</h2>
                            <div>
                                <button className="bg-red-500 rounded-md px-4 py-2 text-white mr-2" onClick={onDelete}>Delete</button>
                                <button className="bg-green-500 rounded-md px-4 py-2 text-white" onClick={onUpdate}>Update</button>
                                <button className="text-red-500 ml-2" onClick={toggleExpansion}>Close</button>
                            </div>
                        </div>
                        {isEditing ? ( // Render edit form if isEditing is true
                            <EditBlogForm
                                titl={title}
                                conten={content}
                                onUpdate={handleUpdate} // Pass handleUpdate function to the edit form
                                onCancel={() => setIsEditing(false)} // Pass a function to cancel editing
                            />
                        ) : (
                            <p className="mt-2">{content}</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogCardWithButtons;
