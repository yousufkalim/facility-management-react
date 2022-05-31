// Init
import React from "react";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Files
import Main from "./routes/Main";
import "./css/index.css";

// Component
function App() {
  return (
    <div className="App">
      {/* toastify container for notification */}
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={true} transition={Flip} />

      {/* Routes */}
      <Main />
    </div>
  );
}

// Export
export default App;
