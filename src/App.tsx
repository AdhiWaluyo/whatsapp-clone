import "./App.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <div className="app__body">
        <Router>
          {/* Sidebar */}
          <Sidebar />
          <Routes>
            {/* Chat */}
            <Route path="/rooms/:roomId" element={<Chat />} />
            <Route path="/" element={<Chat />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
