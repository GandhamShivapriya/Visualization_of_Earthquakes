import React from "react";
import Header from "./components/header/Header";
import MainView from "./components/MainView";
import "./index.css";

function App() {
  return (
    <div className="flex flex-col h-screen">
      <Header className=" w-full h-1/4 header" />
      <MainView className="w-full h-3/4" />
    </div>
  );
}

export default App;
