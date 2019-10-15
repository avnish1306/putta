import React from 'react';
export default class OutputComponent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          output: ''
        };
    }
    render() {
       return <div className='outputDiv'>
                    <label>Output: </label>
                        <textarea className='outputTextArea' rows='25' value={this.props.output}  readOnly name="name" />
                   
               </div>
       }
 }