import { BrowserRouter as Router, Switch, Route } from "react-router-dom"; // 라우터 사용위해 import -> 버전 바뀐거 확인해서 그에 맞게 사용
import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Streaming from "./routes/Streaming";
import Targetinfo from "./routes/Targetinfo";
import Upload from "./routes/Upload";
import React from "react";
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/streaming">
          <Streaming />
        </Route>
        <Route path="/targetinfo">
          <Targetinfo />
        </Route>
        <Route path="/upload">
          <Upload />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
