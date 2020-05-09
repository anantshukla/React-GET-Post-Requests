import React from 'react';
import './App.css';
import axios from "axios";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleGETSubmit = this.handleGETSubmit.bind(this);
    this.handlePOSTSubmit = this.handlePOSTSubmit.bind(this)
    this.state = {
      username: '',
      password: ''
    }
  }

  handleGETSubmit(event){
    event.preventDefault();
    axios({
      url: 'login/',
      method: 'GET',
      withCredentials: true,
      credentials: 'include',
      headers: {
        Sample: 'Sample'
      },
      data: "HiParryThisisFormData"
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log("error GET Request");
    })
  }



  handleFields = e => this.setState({
    [e.target.name]: e.target.value
  });
  
  handlePOSTSubmit(event){
    event.preventDefault();
    axios({
      url: '/login/',
      method: 'POST',
      withCredentials: true,
      headers: {
        Sample: 'Sample'
      },
      data: "HiParryThisisFormData"
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log("error POST Request");
    })
  }


  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleGETSubmit}>
          <button style={{width: "200px"}} type="submit">GET Request</button>
        </form>


        <form onSubmit={this.handlePOSTSubmit}>
          <input type="text" name="username" placeholder="username" onChange={this.handleFields}></input>
          <input type="password" name="password" placeholder="******" onChange={this.handleFields}></input>
          <button type="submit">POST Request</button>
        </form>
      </div>
    );
  }
}

export default App;


