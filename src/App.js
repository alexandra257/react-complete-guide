import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { name: 'Alex', age: 24 },
      { name: 'Stephy', age: 28 },
      { name: 'Jamie', age: 25 },
    ]
  }

  switchNameHandler = (newName) => {
    this.setState({
      persons: [
        { name: newName, age: 24 },
        { name: 'Stephy', age: 28 },
        { name: 'Jamie', age: 25 },
      ]
    })
  }


  //note that the button event handler syntax is inefficient but may be uesful where the bind method isn't so appropriate
  render() {
    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p>This is really working!</p>

        <button onClick={() => this.switchNameHandler('Alexandra!!')}>Switch Name</button>

        <Person
          name={this.state.persons[0].name}
          age={this.state.persons[0].age} />

        <Person name={this.state.persons[1].name}
          age={this.state.persons[1].age}
          click={this.switchNameHandler.bind(this, 'Alex')}> My Hobbies: Yoga </Person>

        <Person name={this.state.persons[2].name}
          age={this.state.persons[2].age} />

      </div>
    );
  }
}

export default App;
