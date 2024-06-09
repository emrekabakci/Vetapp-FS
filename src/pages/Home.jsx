import React from 'react';
import image from '../assets/Main.png'

const Home = () => {
  return (
    <div className='pet-img'>
      <img src={image} height={500}/>
      <h1>Welcome to VetApp</h1>
    </div>
  );
};

export default Home;