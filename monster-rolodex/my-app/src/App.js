// useState is a Hooks used in functional components
// useEffect is a hook using the side effect of a function
import { useState, useEffect } from "react";
// As apposed to setState which is for class components

import CardList from "./components/card-list/card-list.component.jsx";
import SearchBox from "./components/search-box/search-box.component";
import "./App.css";

const App = () => {
	// [value, setValue]
	const [searchField, setSearchField] = useState("");
	const [monsters, setMonsters] = useState([]);
	const [filteredMonsters, setFilterMonsters] = useState(monsters);

	// First argument is the effect we want to happen inside our fxn component. The second argument is a dependency array (state or prop values).
	// When the second argument changes, the fxn will run again.
	// The dependency is empty therefore we don't ever want the fxn to run again.
	useEffect(() => {
		fetch("https://jsonplaceholder.typicode.com/users")
			.then((response) => response.json())
			.then((users) => setMonsters(users));
	}, []);

	useEffect(() => {
		const newFilteredMonsters = monsters.filter((monster) => {
			return monster.name.toLocaleLowerCase().includes(searchField);
		});

		setFilterMonsters(newFilteredMonsters);
	}, [monsters, searchField]);

	const onSearchChange = (event) => {
		// Using toLocaleLowerCase to bypass filter's case sensitive nature
		const searchFieldString = event.target.value.toLocaleLowerCase();
		setSearchField(searchFieldString);
	};

	return (
		<div className="App">
			<h1 className="app-title">Monsters Rolodex</h1>

			<SearchBox
				className="monsters-search-box"
				onChangeHandler={onSearchChange}
				placeholder="search monsters"
			/>

			<CardList monsters={filteredMonsters} />
		</div>
	);
};

export default App;
