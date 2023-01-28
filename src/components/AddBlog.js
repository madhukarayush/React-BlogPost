import React, {useContext, useState} from 'react'
import blogContext from "../context/blogs/blogContext"

const AddBlog = () => {
    const context = useContext(blogContext);
    const {addBlog} = context;

    const [blog, setBlog] = useState({title: "", description: "", tag: ""})

    const handleClick = (e)=>{
        e.preventDefault();
        addBlog(blog.title, blog.description, blog.tag);
        setBlog({title: "", description: "", tag: ""})
    }

    const onChange = (e)=>{
        setBlog({...blog, [e.target.name]: e.target.value})
    }
    return (
        <div className="container my-3">
            <h2>Add a Blog</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={blog.title} onChange={onChange} minLength={5} required /> 
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={blog.description} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={blog.tag} onChange={onChange} minLength={5} required />
                </div>
               
                <button disabled={blog.title.length<5 || blog.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Blog</button>
            </form>
        </div>
    )
}

export default AddBlog
