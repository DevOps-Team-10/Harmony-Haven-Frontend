import React, { useState } from 'react';

const BlogCard = ({ title, content, likes, postId, fullData }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
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
                            <button className="text-red-500" onClick={toggleExpansion}>Close</button>
                        </div>
                        <p className="mt-2">{content}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogCard;