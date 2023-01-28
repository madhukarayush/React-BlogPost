import React, {useContext} from 'react'
import blogContext from "../context/blogs/blogContext"


const Blogitem = (props) => {
    const context = useContext(blogContext);
    const { deleteBlog } = context;
    const { blog, updateBlog } = props;
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{blog.title}</h5>
                        <i className="far fa-trash-alt mx-2" onClick={()=>{deleteBlog(blog._id)}}></i>
                        <i className="far fa-edit mx-2" onClick={()=>{updateBlog(blog)}}></i>
                    </div>
                    <p className="card-text">{blog.description}</p>

                </div>
            </div>
        </div>
    )
}

export default Blogitem
