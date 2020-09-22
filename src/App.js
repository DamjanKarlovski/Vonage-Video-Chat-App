import React from "react";
import VideoChatComponent from "./VideoChatComponent";
import logo from "./assets/dianurse-logo.png";
import logoIcon from "./assets/logo-icon.png";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <div className="nav-bar">
        <div className="title">
          <img src={logoIcon} alt="logo icon" className="logoIcon" />
          <p>Dianurse Video Chat Application</p>
        </div>
        <img src={logo} alt="dianurse logo" className="logo" />
      </div>
      <VideoChatComponent />
    </div>
  );
}

export default App;
