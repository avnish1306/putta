import React from 'react';
import logo from './logo.svg';
import './App.css';
import InputComponent from './input';
import OutputComponent from './output';
export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
       input :'',
       output:'',
       requested:false,
       url:''
      };
    this.handleChange = this.handleChange.bind(this);
    this.getInput = this.getInput.bind(this);
    this.getData = this.getData.bind(this);
    this.setUrl = this.setUrl.bind(this);
  }
  handleChange = event =>{
    this.setState({input:event.target.value});
  };
  setUrl = event=>{
    //console.log(event.target.value);
    this.setState({url:event.target.value});
    if(this.state.url===''){
      this.setState({requested:true});
    }
  }
  getData = ()=>{
    return this.state.output;
  }
  getInput = input=>{
    //console.log(this.state,input);
    this.setState({input:input});
    
      let data={
        'type':'get',
        'cmd':input
      }
    this.setState({requested:true});
    fetch(this.state.url,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(function(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response.json();
    }).then(res=>{
      if(res.status===1){
        this.setState({output:this.state.output+'\n'+res.result});
      }
      this.setState({requested:false});
    }).catch(err=>{
      console.log(err);
      this.setState({requested:false});
    })
  }
  render() {
    return <div className="App">
    <input type="text" className='urlInput' placeholder='Enter Url to hit' onChange={this.setUrl} name="name" />
            <div className="Input">
              <InputComponent sendInput = {this.getInput} requested = {this.state.requested}/>
              </div>
              <div className="Output">
            <OutputComponent output = {this.state.output}/>
            </div>
          </div>
  }
}

