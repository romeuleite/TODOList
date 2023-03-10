import { useEffect, useState } from "react";
import { TaskList } from "./components/TaskList";
import { SingleList } from "./pages/SingleList";
import { Home } from "./pages/Home";
import { Router } from "./Routes";
import { BrowserRouter } from "react-router-dom";


function App() {
  return (
    <>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  );
}

export default App;