import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import styled from "styled-components";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Sidebar />
    </div>
  );
}

export default App;

const InnerComponent = styled.div``;
