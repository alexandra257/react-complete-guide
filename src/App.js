import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {

  state = {
    persons: [
      { id: 'gsger', name: 'Alex', age: 24 },
      { id: 'hesgf', name: 'Stephy', age: 28 },
      { id: 'vsdgh', name: 'Jamie', age: 25 },
    ],
    showPersons: false
  }



  //--------------EVENT LISTENERS BELOW-------------------
  nameChangedHandler = (event) => {
    this.setState({
      persons: [
        { name: 'Alex', age: 24 },
        { name: event.target.value, age: 28 },
        { name: 'Jamie', age: 25 },
      ]
    })
  }

  /*by using the spread operator [...], we can create a copy of the array state
    this means we can combine the old elements with the new elements without mutating the original data*/
  //this will delete the person we click on (set to fire on click of relative <p>)
  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons]; //reaches out to persons in state, spreads out the elements of the array into a list of elements, which then get added into the new array
    persons.splice(personIndex, 1);  //removes 1 element from the array & creates an updated version of the array
    this.setState({ persons: persons }); //updating the state of the persons constant because a person has been removed frome the array
  }



  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;  //storing the current state of showPersons in doesShow
    this.setState({ showPersons: !doesShow })  //setting state of showPersons to what doesShow is not
  }



  //--------------RENDER METHOD BELOW---------------------
  //note that the button event handler syntax is inefficient but may be uesful where the bind method isn't so appropriate
  render() {  //render gets called everytime React checks to see if we need to re-render the page

    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };


    /*----------------- DYNAMICALLY RENDERING PERSONS COMPONENT-----------------
    /we can utilise the if statement here because we can use noraml JS within the render method
      only within the return menthod do we need to use JSX */

    let persons = null; //we set the persons variable to nothing

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {    //map over each element in the array, pass in index as argument
            return <Person                                //return Person component as JSX 
              click={() => this.deletePersonHandler(index)}     //deletes person at relevant index when user clicks (attached to <p> element in Person.js)
              name={person.name}
              age={person.age}
              key={person.id} />//
          })}
        </div>
      );
    }


    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p>This is really working!</p>

        <button style={style} onClick={this.togglePersonsHandler}>Toggle</button>

        {persons}   {/*referencing the persons variable in the return method*/}

      </div>
    );
  }
}

export default App;
