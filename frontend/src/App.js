import "./App.css";
import LandingPage from "./components/LandingPage";
import { MyProvider } from "./components/MyContext";
import { Route, Routes } from "react-router-dom";
import VideoPage from "./components/VideoPage";

function App() {
  return (
    <div className="App">
      <MyProvider>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/video/:videoId" element={<VideoPage />} />
        </Routes>
      </MyProvider>
    </div>
  );
}

export default App;
