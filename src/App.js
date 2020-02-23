import React, { Component } from 'react';
import './App.css';
import Radium, { StyleRoot } from 'radium';
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
  //below we use a string id to select an array item (object);
  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {   //we're using p to refer to 'person'
      return p.id === id; //if the person's id === id we recieved as an argument to this function, return true & personIndex will hold the index of the person in the array for which the id's are equal	
    });

    //we can get the person itself, by reaching out to the persons in state
    //again, we use the spread operator to avoid mutating the state (because JS objects are reference types)
    const person = {       //the curly braces allow us to create a JS new object
      ...this.state.persons[personIndex]   //spread is used infront of the object we're fetching & distributes all properties of the object we fetched, bringing them into the new object
    };

    //we now have a copy of perons, so below we do not mutate the original values
    person.name = event.target.value;   // gets the value from the input field to update the name

    const persons = [...this.state.persons];  //copies old array values & updates with new values 
    persons[personIndex] = person; //updates the persons array at the correct index

    this.setState({ persons: persons }); //state is set to the updated persons array (copy of old array with updated name)
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

    //with :'hover' we are assigning a css pseudo selector as a property using Radium
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    };


    /*----------------- DYNAMICALLY RENDERING PERSONS COMPONENT-----------------
    /we can utilise the if statement here because we can use noraml JS within the render method
      only within the return menthod do we need to use JSX */

    //below i'm using the  map()'s index to select an array item

    let persons = null; //we set the persons variable to nothing

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {    //map over each element in the array, pass in index as argument
            return <Person                                //return Person component as JSX 
              click={() => this.deletePersonHandler(index)}     //deletes person at relevant index when user clicks (attached to <p> element in Person.js)
              name={person.name}
              age={person.age}
              key={person.id}
              changed={(event) => this.nameChangedHandler(event, person.id)} />
            //above we use the function syntax for the changed prop so we can pass it the event object
            //this then allows us to gain access to the person properties, as changed is within the .map() method
            //we can now use persons data (in particular the id) in the nameChangedHandler method
          })}
        </div>
      );

      //using javascript to manipulate whatever style we binded to the property
      style.backgroundColor = 'red';  //if persons is false, the button background will be red

      style[':hover'] = {             //Radium
        backgroundColor: 'salmon',
        color: 'black'
      }

    }

    // let classes = ['red', 'bold'].join(' '); //same class names assigned in App.css
    //join turns the array of strings into one string = "red bold" (this is a css class list that we can assign to className)

    const classes = [];
    if (this.state.persons.length <= 2) {  //if there are 2 Person rendered, text will turn red
      classes.push('red') // classes = ['red']
    }
    if (this.state.persons.length <= 1) { //if there is 1 Person rendered, text will be red & bold
      classes.push('bold') // classes = ['red', 'bold']
    }


    return (
      <StyleRoot>
        <div className="App">
          <h1>Hi, I'm a React App</h1>
          <p className={classes.join(' ')}>This is really working!</p> {/*styling is below the Person conditional rendering*/}

          <button
            style={style}
            onClick={this.togglePersonsHandler}>Toggle Person</button>

          {persons}

        </div>
      </StyleRoot>
    );
  }
}

export default Radium(App);
