import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import { Home } from './components/Home';
import About from './components/About';
import BlogState from './context/blogs/BlogState';
import Signup from './components/Signup';
import Login from './components/Login';
import ResetPassword from './components/ResetPassword';

function App() {
  return (
    <>
      <BlogState>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/signup">
                <Signup />
              </Route>
              <Route exact path="/reset">
                <ResetPassword />
              </Route>
            </Switch>
          </div>
        </Router>
      </BlogState>
    </>
  );
}

export default App;
