import React, { useState, useEffect, useContext } from 'react';
import BlogCardWithButtons from './BlogCardWithButtons.js';
import UserContext from '../context/UserContext.js';

const MyBlogs = () => {
    const { user } = useContext(UserContext);
    const [blogs, setBlogs] = useState([]);
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await fetch("/blog", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.accessToken}`
                    }
                });
                const data = await res.json();
                setBlogs(data.blogs);
                setFilteredBlogs(data.blogs); // Set filteredBlogs initially to all blogs
            } catch (error) {
                console.error(error);
            }
        };

        fetchBlogs();
    }, [user.accessToken]);

    useEffect(() => {
        const filtered = blogs.filter(blog => blog.title.toLowerCase().includes(searchTerm.toLowerCase()));
        setFilteredBlogs(filtered);
    }, [blogs, searchTerm]);

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={handleChange}
                className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500 mb-4 w-full"
            />
            <div className="overflow-auto max-h-96"> {/* Adjust the max height as per your requirement */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredBlogs.map((blog, index) => (
                        <BlogCardWithButtons key={index} title={blog.title} content={blog.content} likes={blog.likes} fullData={blog} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyBlogs;
