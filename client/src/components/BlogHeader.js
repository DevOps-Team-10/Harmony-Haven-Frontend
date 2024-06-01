import React from 'react';

const BlogHeader = ({ currentView, setCurrentView }) => {
  return (
    <div className="bg-stone-700 p-4 rounded-md">
      <ul className="flex space-x-4 justify-center text-white">
        <li>
          <button
            onClick={() => setCurrentView('allBlogs')}
            className={`hover:text-yellow-400 focus:outline-none ${currentView === 'allBlogs' ? 'text-yellow-400' : ''}`}
          >
            Blogs
          </button>
        </li>
        <li>
          <button
            onClick={() => setCurrentView('myBlogs')}
            className={`hover:text-yellow-400 focus:outline-none ${currentView === 'myBlogs' ? 'text-yellow-400' : ''}`}
          >
            My Blogs
          </button>
        </li>
        <li>
          <button
            onClick={() => setCurrentView('createBlog')}
            className={`hover:text-yellow-400 focus:outline-none ${currentView === 'createBlog' ? 'text-yellow-400' : ''}`}
          >
            Create Blog
          </button>
        </li>
      </ul>
    </div>
  );
};

export default BlogHeader;
