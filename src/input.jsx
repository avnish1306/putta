import React from 'react';
export default class InputComponent extends React.Component{
    constructor(props) {
        super(props);
        this.cursor = 'awi-> ';
        this.state = {
          input: this.cursor,
          inputArray:[]
        };
        
        // this.handleChange = this.handleChange.bind(this);
        this.clearInput = this.clearInput.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }
    clearInput(){
        this.setState({input:this.cursor});
    }
    // handleChange(event) {
    //     this.setState({input: event.target.value});
    //   }
    
    handleKeyDown(e) {
        e.preventDefault();
        let start = this.refs.myInput.selectionStart;
        let end = this.refs.myInput.selectionEnd;
        if(start!==end&&end===this.state.input.length){
            let selectedStr = this.state.input.slice(start,end);
            let match = /\r|\n/.exec(selectedStr);
            if(!match)
                this.state.input=this.state.input.slice(0,start);
        }
        if (e.keyCode === 8) {
            if(start===end&&end===this.state.input.length){
                if(this.state.input.length!==0&&this.state.input[start-1]!=='\r'&&this.state.input[start-1]!=='\n'&&this.state.input.slice(start-this.cursor.length,start)!==this.cursor){
                    this.state.input=this.state.input.slice(0,start-1);
                }
            }
        }else if(e.keyCode===13){
            if(e.shiftKey===true){
                if(start===end&&end===this.state.input.length){
                    this.state.input+='\n'+this.cursor;
                }
                //console.log(this.state.input);
            }else{
                if(start===end&&end===this.state.input.length){
                    this.state.input+='\r'+this.cursor;
                }
                this.inputArray =  this.state.input.split(/\r/);
                this.props.sendInput(this.inputArray[this.inputArray.length-2].replace(new RegExp(this.cursor, 'g'), ''));
            }
            
           
        }
        else if(e.keyCode !== 46&&e.key.length<=2){
            if(start===end&&end===this.state.input.length){
                this.state.input+=e.key;
            }
        }
        this.setState({input:this.state.input});

      }
    render() {
       return <>
                    <label>Command:  </label>
                    <button onClick={this.clearInput} className='inputClearButton'> Clear</button>
                    <hr />
                        <textarea
                        className='inputTextArea'
                         ref='myInput'
                         rows='15' value={this.state.input}
                         onKeyDown={this.handleKeyDown}
                         readOnly={this.props.requestDone}
                         name="name"
                         />

               </>
       }
 }