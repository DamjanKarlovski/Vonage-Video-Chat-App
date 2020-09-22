import React from "react";
import VideoChatComponent from "./VideoChatComponent";
import logo from "./assets/dianurse-logo.png";
import logoIcon from "./assets/logo-icon.png";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <div className="nav-bar">
        <img src={logo} alt="dianurse logo" className="logo" />
        <p>Video Chat Application</p>

        <img src={logoIcon} alt="logo icon" className="logoIcon" />
      </div>
      <VideoChatComponent />
    </div>
  );
}

export default App;
