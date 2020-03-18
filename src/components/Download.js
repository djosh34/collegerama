import React from 'react';
import './css/Download.css';
import openSocket from 'socket.io-client';







class Download extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        id: '',
        message: ''
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

      

    }

    componentDidMount () {
        this.socket.on('output', (data) =>  {
            console.log(data);
            this.handleMessage(data);
        });
    }

    socket = openSocket('http://localhost:3001');
  
    handleChange(event) {
      this.setState({ id: event.target.value });
    }

    handleMessage(message) {
        this.setState({message: message});
    }
  
    handleSubmit(event) {
      event.preventDefault();
      this.socket.emit("input", this.state.id);
      
    }

   

    render() {
        return (
          <div className="Download">
            <header className="Download-header">
              <h2>
                Enter your id of the video you want to download
              </h2>
              <p>Please wait till the download is completed,<br/> 
              you can check on the status of your download if you go to 
              <br/> /public/lectures/ and check if the file size of the video is increasing</p>
              <br/>
              <p className="italic"> Note: if the screen is flashing, that means that starting the download is succesfull <br/>
              another flash and it's finished</p>
              <form onSubmit={this.handleSubmit}>
                <input
                  id="id"
                  className="input"
                  type="text"
                  value={this.state.id}
                  onChange={this.handleChange}
                />
                <button type="submit">Submit</button>
              </form>
              <p>{this.state.message}</p>
            </header>
          </div>
        );
      }
}

export default Download;