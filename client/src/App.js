import React, { Component } from "react";
import "./App.css";
import axios from "axios";

const endpoint = "https://thawing-gorge-90101.herokuapp.com/vasts/vast";

class App extends Component {
  constructor() {
    super();
    this.state = {
      selectedFile: null,
      loaded: 0
    };
  }
  handleselectedFile = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0
    });
  };
  handleUpload = () => {
    const data = new FormData();
    data.append("file", this.state.selectedFile, this.state.selectedFile.name);

    axios
      .post(endpoint, data, {
        onUploadProgress: ProgressEvent => {
          this.setState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100
          });
        }
      })
      .then(res => {
        console.log(res.statusText);
      });
  };
  render() {
    return (
      <div className="App">
        <h1>Upload vasts</h1>
        <input type="file" name="" id="" onChange={this.handleselectedFile} />
        <button onClick={this.handleUpload}>Upload</button>
        <div> {Math.round(this.state.loaded, 2)} %</div>
      </div>
    );
  }
}

export default App;
