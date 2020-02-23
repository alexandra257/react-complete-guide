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
  render() {  //render gets called everytime React checks to see if we need to re-render the page

    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

    let persons = null;
    //we can utilise the if statement here because we can use noraml JS within the render method
    //only within the return menthod do we need to use JSX
    if (this.state.showPersons) { //if showPersons in state is true
      persons = (
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
        </div>
      )
    }

    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p>This is really working!</p>

        <button
          style={style}
          onClick={this.togglePersonsHandler}>
          Toggle
          </button>

        {persons}

      </div>
    );
  }
}

export default App;
