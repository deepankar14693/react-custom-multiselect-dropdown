import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MultiSelectDropdown from './MultiSelectDropdown/multiSelectDropdown';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    }
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return (
      <div className="App" id="app">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
        </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
        </a>
        </header>

        <div style={{ margin: '40px' }}>
          <button type="button" onClick={() => this.toggleModal()} className="btn btn-outline-dark" style={{ height: '85px', fontSize: 'xx-large', float: 'left' }}>Trigger Modal</button>
        </div>

        {this.state.isOpen &&
          <MultiSelectDropdown isOpen={this.state.isOpen} toggle={this.toggleModal} />
        }

      </div>
    );
  }
}

export default App;
