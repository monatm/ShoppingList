import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const AddShoppingForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:3032/Buy/add', {
      title,
      quantity
    })
      .then(res => {
        onAdd(res.data);
        setTitle('');
        setQuantity('');
      })
      .catch(err => {
        console.error(err);
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <label htmlFor="quantity">Quantity</label>
      <textarea
        id="quantity"
        value={quantity}
        onChange={e => setQuantity(e.target.value)}
      />

      <button type="submit">Add to your list</button>
    </form>
  );
};

const List = ({ list, onRemove }) => {
  const handleRemove = (title) => {
    axios.delete(`http://localhost:3032/Buy/${title}`)
      .then(res => {
        console.log(res);
        onRemove(title);
      })
      .catch(err => {
        console.error(err);
      });
  };

  return list.map((item, index) => {
    return (
      <div key={index}>
        <h1>{item.title}</h1>
        <p>{item.quantity}</p>
        <button onClick={() => handleRemove(item.title)}>Delete</button>
      </div>
    );
  });
};

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
  }, []);

  return (
    <div className="App">
      <AddShoppingForm onAdd={handleAddItem} />
      <List list={list} onRemove={handleRemoveItem} />
    </div>
  );
}

export default App;
