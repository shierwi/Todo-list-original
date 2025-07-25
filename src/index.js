import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoList from "./components/TodoList";
import Fetch from "./components/Fetch";
import Axios from "./components/Axios";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<TodoList />} />
        <Route path="fetch" element={<Fetch />} />
        <Route path="axios" element={<Axios />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
