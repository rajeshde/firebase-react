import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import Users from "./components/Users";

toast.configure({ autoClose: 2000, draggable: false });

function App() {
  return (
    <div className="App">
      <Users />
      <ToastContainer />
    </div>
  );
}

export default App;
