import './App.css';
import Register from './Components/Register';
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <h1>MERN APP!</h1>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/register" component={Register}></Route>
          <Route exact path="/dashboard" component={Dashboard}></Route>
        </Switch>
      </Router>
      {/* <Register/> */}
    </div>
  );
}

export default App;
