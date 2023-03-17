import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { AddShoppingForm } from './components/ShoppingForm';
import { List } from './components/List';


function App() {
  const [list, setList] = useState([]);

  const handleAddItem = item => {
    setList([...list, item]);
  };

  const handleRemoveItem = title => {
    setList(list.filter(item => item.title !== title));
  };

  useEffect(() => {
    axios.get('http://localhost:3032/Buy/')
      .then(res => {
        console.log(res);
        setList(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, [list]);

  return (
    <div className="App">
      <AddShoppingForm onAdd={handleAddItem} />
      <List list={list} onRemove={handleRemoveItem} />
    </div>
  );
}

export default App;
