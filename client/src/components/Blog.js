// Blog.js
import React, { useState } from 'react';
import BlogHeader from './BlogHeader.js';
import AllBlogs from './AllBlogs.js';
import MyBlogs from './MyBlogs.js';
import CreateBlog from './CreateBlog.js';

const Blog = () => {
  const [currentView, setCurrentView] = useState('allBlogs');

  const renderView = () => {
    switch (currentView) {
      case 'allBlogs':
        return <AllBlogs />;
      case 'myBlogs':
        return <MyBlogs />;
      case 'createBlog':
        return <CreateBlog />;
      default:
        return <AllBlogs />;
    }
  };

  return (
    <div className="container mx-auto">
      <BlogHeader setCurrentView={setCurrentView} />
      <div className="mt-8">
        {renderView()}
      </div>
    </div>
  );
};

export default Blog;
