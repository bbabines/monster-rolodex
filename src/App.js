import { Component } from "react"
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: ""
    };
    console.log("constructor");
  }

  componentDidMount() {
    console.log("componentDidMount");
    fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
     .then((users) => this.setState(() => {
        return {monsters: users}
      },
      () => {
        console.log(users);
      }
     ));
  }
     

  onSearchChange = (event)=> {
       
    // Using toLocaleLowerCase to bypass filter's case sensitive nature
    const searchField = event.target.value.toLocaleLowerCase()

   this.setState(() => {
    return { searchField }
   })

  }


  render() {
    console.log("render");

    // Filter IS case sensitive
    const filteredMonsters = this.state.monsters.filter((input) => {
      return input.name.toLocaleLowerCase().includes(this.state.searchField)
    })


  return (
    <div className="App">
      <input className="search-box" type="search" placeholder="search monsters" onChange={this.onSearchChange} />

  {
    filteredMonsters.map( (monster) => {
     return (
      <div key={monster.id}>
        <h1 >{monster.name}</h1>
     </div>
     )
    })}
    </div>
  );
}}

export default App;
