import { Link } from "react-router-dom";
import Signup from './Signup';
import Blogs from './Blogs';

export const Home = () => {
  return (
    <div>
      <div className="container">
          {/* <Signup/>
        <Link className="btn btn-primary mx-3 my-3" to="/login" role="button">
          Login
        </Link> */}
        <Blogs/>
      </div>
    </div>
  );
};
