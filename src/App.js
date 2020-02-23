import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { name: 'Alex', age: 24 },
      { name: 'Stephy', age: 28 },
      { name: 'Jamie', age: 25 },
    ],
    showPersons: false
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


  nameChangedHandler = (event) => {
    this.setState({
      persons: [
        { name: 'Alex', age: 24 },
        { name: event.target.value, age: 28 },
        { name: 'Jamie', age: 25 },
      ]
    })
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;  //storing the current state of showPersons in doesShow
    this.setState({ showPersons: !doesShow })  //setting state of showPersons to what doesShow is not
  }


  //note that the button event handler syntax is inefficient but may be uesful where the bind method isn't so appropriate
  render() {

    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p>This is really working!</p>

        <button
          style={style}
          onClick={this.togglePersonsHandler}>
          Toggle Persons
          </button>
        {
          this.state.showPersons ?     //first half of ternary expression, is a boolean value so automatically assigns to true 

            <div>
              <Person
                name={this.state.persons[0].name}
                age={this.state.persons[0].age} />

              <Person name={this.state.persons[1].name}
                age={this.state.persons[1].age}
                click={this.switchNameHandler.bind(this, 'Alex')}
                changed={this.nameChangedHandler}> My Hobbies: Yoga </Person>

              <Person name={this.state.persons[2].name}
                age={this.state.persons[2].age} />

            </div> : null     //second half of the ternary expression, is a boolean value so automatically assigns to false 
        }
      </div>
    );
  }
}

export default App;
