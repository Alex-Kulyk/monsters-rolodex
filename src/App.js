import React from 'react';
import { CardList } from './components/card-list/Card-list';
import { SearchBox } from './components/search-box/Search-box';

import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField: '',
    };
  }

  handleChange = (e) => {
    this.setState({ searchField: e.target.value });
  };

  componentDidMount() {
    return async function () {
      const fetching = await fetch(
        'https://jsonplaceholder.typicode.com/users'
      );
      const response = await fetching.json();
      await this.setState({ monsters: response });
    }.bind(this)();
  }
  render() {
    const { monsters, searchField } = this.state;
    const filtredMonsters = monsters.filter((monster) =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );
    return (
      <div className='App'>
        <h1>Monster Roledex</h1>
        <SearchBox
          placeholder='search monsters'
          handleChange={this.handleChange}
        />
        <CardList monsters={filtredMonsters} />
      </div>
    );
  }
}

export default App;
