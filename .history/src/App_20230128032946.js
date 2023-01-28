import "./App.css";
import React, { Component } from "react";
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export class App extends Component {
  pageSize = 8;
  apiKey = process.env.API_KEY;

  state = {
    progress: 0,
  };

  setProgress = (progress) => {
    this.setState({ progress: progress });
  };

  render() {
    return (
      <Router>
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
}

export default App;
