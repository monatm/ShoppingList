import axios from 'axios';
import React, { useState, useEffect } from 'react';


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
        <div className='list'  key={index}>
          <h1>{item.title}</h1>
          <p>{item.quantity}</p>
          <button  onClick={() => handleRemove(item.title)}>Delete</button>
        </div>
      );
    });
  };
  
  export {List};