import React from 'react';
import './App.css';
import axios from "axios";
import Cookies from 'js-cookie';
const fs = require('fs')


export class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleGETSubmit = this.handleGETSubmit.bind(this);
    this.handlePOSTSubmit = this.handlePOSTSubmit.bind(this)
    this.handlePOSTSubmitProject = this.handlePOSTSubmitProject.bind(this)
    this.handlePOSTSubmitUpload = this.handlePOSTSubmitUpload.bind(this)
    this.state = {
      username: '',
      password: '',
      name:'',
      filename:'',
      selectedFile: null
    }
  }

  handleGETSubmit(event){
    event.preventDefault();
    
    //console.logCookies.get('csrftoken')
    console.log(Cookies.get('csrftoken'))
    //let formdata = new FormData()
    //formdata.append("csrfmiddlewaretoken", Cookies.get('csrftoken'))
    //formdata.append("username", this.state.username)
    //formdata.append("password", this.state.password)
    //formdata.append("api", "true")

    axios({
      url: 'login/',
      method: 'GET',
      withCredentials: true,
      credentials: 'include',
      headers: {
        Sample: 'Sample'
      },
      data: "HiParryThisisFormData"
      //data: formdata
    })
    .then((response) => {
      //console.log(response.data);
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
    let formdata = new FormData()
    formdata.append("csrfmiddlewaretoken", Cookies.get('csrftoken'))
    formdata.append("username", this.state.username)
    formdata.append("password", this.state.password)
    formdata.append("api", "true")
    axios({
      url: '/login/',
      method: 'POST',
      withCredentials: true,
      headers: {
        Sample: 'Sample'
      },
      //data: "HiParryThisisFormData"
      data: formdata
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log("error POST Request");
    })
  }

  handlePOSTSubmitProject(event){
    event.preventDefault();
    let formdata = new FormData()
    formdata.append("csrfmiddlewaretoken", Cookies.get('csrftoken'))
    formdata.append("name", this.state.name)
    formdata.append("api", "true")
    axios({
      url: '/route_planner/create/',
      method: 'POST',
      withCredentials: true,
      headers: {
        Sample: 'Sample'
      },
      //data: "HiParryThisisFormData"
      data: formdata
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log("error POST Request");
    })
  }
  onFileChange = event => { 
     
    // Update the state 
    this.setState({ selectedFile: event.target.files[0] }); 
    console.log(this.state.selectedFile);
  }; 
  handlePOSTSubmitUpload(event){
    event.preventDefault();
    const formdata = new FormData();
    formdata.append("csrfmiddlewaretoken", Cookies.get('csrftoken'));
    
    formdata.append("file", this.state.selectedFile);
    formdata.append("api", "true");
    console.log(this.selectedFile);
    axios({
      url: '/route_planner/upload_targs/',
      method: 'POST',
      withCredentials: true,
      headers: {
        Sample: 'Sample'
      },
      //data: "HiParryThisisFormData"
      data: formdata
    })
    .then((response) => {
      //console.log(response.data);
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

        <form onSubmit={this.handlePOSTSubmitProject}>
          <input type="text" name="name" placeholder="name" onChange={this.handleFields}></input>
          <button type="submit">POST Request</button>
        </form>

        <div >
            <input type="file" name="filename" onChange={this.onFileChange} />
            <button onClick={this.handlePOSTSubmitUpload}> 
                  Upload! 
                </button> 
        </div>
        
      </div>
    );
  }
}

export default App;


