import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import Header from '../components/Header'; 
import Footer from '../components/Footer'; 
import ProductTable from '../components/home/ProductTable'; 
import Nav from '../components/Nav';

const HomeTable = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    
  
    useEffect(() => {
      setLoading(true);
      axios
        .get('http://localhost:5555/products')
        .then((response) => {
          setProducts(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }, []);
    console.log('Products:', products);
console.log('Loading:', loading);
  
  return (
    <div className='p-4'>
    <div style={{ 
    backgroundImage: 'linear-gradient(to right, rgb(255, 240, 245, 1), rgb(135, 206, 250, 0.6)), url(../image/clinical-laboratory.jpg)',
    backgroundSize: 'cover',
    height: '150vh'
  }}>
    <Header /> 
    <Nav /> 
      
      <br />
    
      <h1 className='text-2xl my-8'>Current Products List</h1>
      <ProductTable products={products} showManageColumn={false}/>
    </div>
    <Footer /> 
    <br />
    <br />
    </div>
    
  );
};

export default HomeTable;