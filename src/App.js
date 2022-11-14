import { Component } from "react"
import logo from './logo.svg';
import './App.css';
import CardList from "./components/card-list/card-list.component.jsx";
import SearchBox from "./components/search-box/search-box.component";

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: ""
    };
    
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
     .then((users) => this.setState(() => {
        return {monsters: users}
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
    

    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;

    // Filter IS case sensitive
    const filteredMonsters = monsters.filter((input) => {
      return input.name.toLocaleLowerCase().includes(searchField)
    })


  return (
    <div className="App">
      
      
      <SearchBox 
        onChangeHandler={ onSearchChange } 
        placeholder="search monsters" 
        className="search-box"
      />

      <CardList 
        monsters={ filteredMonsters } 
      />

    </div>
  );
}}

export default App;
