import "./App.css";
import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  let pageSize = 8;
  let apiKey = process.env.REACT_APP_API_KEY;

  let [progress, setProgressVal] = useState(0);

  setProgress = (progress) => {
    setProgressVal(progress);
  };

  return (
    <Router>
      <div>
        <LoadingBar color="#3489eb" progress={progress} height={3} />
        <Navbar />
        <Routes>
          <Route
            exact
            path="/business"
            element={
              <News
                apiKey={apiKey}
                setProgress={setProgress}
                key="business"
                pageSize={pageSize}
                category="business"
                country="in"
              />
            }
          />
          <Route
            exact
            path="/sports"
            element={
              <News
                apiKey={apiKey}
                setProgress={setProgress}
                key="sports"
                pageSize={pageSize}
                category="sports"
                country="in"
              />
            }
          />
          <Route
            exact
            path="/entertainment"
            element={
              <News
                apiKey={apiKey}
                setProgress={setProgress}
                key="entertainment"
                pageSize={pageSize}
                category="entertainment"
                country="in"
              />
            }
          />
          <Route
            exact
            path="/health"
            element={
              <News
                apiKey={apiKey}
                setProgress={setProgress}
                key="health"
                pageSize={pageSize}
                category="health"
                country="in"
              />
            }
          />
          <Route
            exact
            path="/science"
            element={
              <News
                apiKey={apiKey}
                key="science"
                setProgress={setProgress}
                pageSize={pageSize}
                category="science"
                country="in"
              />
            }
          />
          <Route
            exact
            path="/technology"
            element={
              <News
                apiKey={apiKey}
                key="technology"
                setProgress={setProgress}
                pageSize={pageSize}
                category="technology"
                country="in"
              />
            }
          />
          <Route
            exact
            path="/"
            element={
              <News
                apiKey={apiKey}
                key="general"
                setProgress={setProgress}
                pageSize={pageSize}
                category="general"
                country="in"
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
