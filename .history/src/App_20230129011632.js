import "./App.css";
import React,{useState} from "react";
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  let pageSize = 8;
  let apiKey = process.env.REACT_APP_API_KEY

  let [progress,setProgressVal] = useState(0)

  setProgress = (progress) => {
    setProgressVal(progress)
  };

    return (
      <Router>
        {console.log(this.apiKey)}
        <div>
          <LoadingBar
            color="#3489eb"
            progress={this.state.progress}
            height={3}
          />
          <Navbar />
          <Routes>
            <Route
              exact
              path="/business"
              element={
                <News
                  apiKey={this.apiKey}
                  setProgress={this.setProgress}
                  key="business"
                  pageSize={this.pageSize}
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
                  apiKey={this.apiKey}
                  setProgress={this.setProgress}
                  key="sports"
                  pageSize={this.pageSize}
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
                  apiKey={this.apiKey}
                  setProgress={this.setProgress}
                  key="entertainment"
                  pageSize={this.pageSize}
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
                  apiKey={this.apiKey}
                  setProgress={this.setProgress}
                  key="health"
                  pageSize={this.pageSize}
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
                  apiKey={this.apiKey}
                  key="science"
                  setProgress={this.setProgress}
                  pageSize={this.pageSize}
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
                  apiKey={this.apiKey}
                  key="technology"
                  setProgress={this.setProgress}
                  pageSize={this.pageSize}
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
                  apiKey={this.apiKey}
                  key="general"
                  setProgress={this.setProgress}
                  pageSize={this.pageSize}
                  category="general"
                  country="in"
                />
              }
            />
          </Routes>
        </div>
      </Router>
    );
  
}

export default App;
