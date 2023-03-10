import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { SingleList } from "./pages/SingleList";

export function Router() {
    return(
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/detalhes" element={<SingleList/>} />
        </Routes>
    );
}