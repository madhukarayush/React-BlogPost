import BlogContext from "./blogContext";
import { useState } from "react";

const BlogState = (props) => {
  const host = "http://localhost:5000"
  const blogsInitial = []
  const [blogs, setBlogs] = useState(blogsInitial)
  const token = localStorage.getItem('token')

  // Get all Blogs
  const getBlogs = async (req, res) => {

    // API Call 
    const response = await fetch(`${host}/api/blogs/fetchallblogs?page=1&limit=10`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": token
      }
    });
    const json = await response.json() 
    setBlogs(json)
  }

  // Add a Blog
  const addBlog = async (title, description, tag) => {
    // TODO: API Call
    // API Call 
    const response = await fetch(`${host}/api/blogs/addblog`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": token
      },
      body: JSON.stringify({title, description, tag})
    });

    const blog = await response.json();
    setBlogs(blogs.concat(blog))
  }

  // Delete a Blog
  const deleteBlog = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/blogs/deleteblog/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": token
      }
    });
    const json = response.json(); 
    const newBlogs = blogs.filter((blog) => { return blog._id !== id })
    setBlogs(newBlogs)
  }

  // Edit a Blog
  const editBlog = async (id, title, description, tag) => {
    // API Call 
    const response = await fetch(`${host}/api/blogs/updateblog/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": token
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json(); 

     let newBlogs = JSON.parse(JSON.stringify(blogs))
    
     // Logic to edit in client
    for (let index = 0; index < newBlogs.length; index++) {
      const element = newBlogs[index];
      if (element._id === id) {
        newBlogs[index].title = title;
        newBlogs[index].description = description;
        newBlogs[index].tag = tag; 
        break; 
      }
    }  
    setBlogs(newBlogs);
  }

  return (
    <BlogContext.Provider value={{ blogs, addBlog, deleteBlog, editBlog, getBlogs }}>
      {props.children}
    </BlogContext.Provider>
  )

}
export default BlogState;