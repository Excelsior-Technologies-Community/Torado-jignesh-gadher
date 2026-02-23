import Navbar from '../Componet/Navbar';
import Section1 from '../Section/Section1';
import Section2 from '../Section/Section2';
import Section3 from '../Section/Section3';
import Section4 from '../Section/Section4';
import Section5 from '../Section/Section5';
import Section6 from '../Section/Section6';
import Section7 from '../Section/Section7';
import Section8 from '../Section/Section8';
import ThemeToggle from '../Components/ThemeToggle';
import React from 'react';  

const Home = () => {
  return (
    <>
      <Navbar />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Section6 />
      <Section7 />
      <Section8 />
      <ThemeToggle />
    </>
  )
}

export default Home