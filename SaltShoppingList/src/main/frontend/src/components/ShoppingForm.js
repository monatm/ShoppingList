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

      <label htmlFor="quantity">Quantity:</label>
      <textarea
        id="quantity"
        value={quantity}
        onChange={e => setQuantity(e.target.value)}
      />

      <button type="submit">Add to your list</button>
    </form>
  );
};

export { AddShoppingForm };