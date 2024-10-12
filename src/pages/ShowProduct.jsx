import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import Header from '../components/Header'; 
import Footer from '../components/Footer';
import Nav from '../components/Nav'; 

const ShowProduct = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='p-4'>
    <div style={{ 
    backgroundImage: 'linear-gradient(to right, rgb(255, 240, 245, 1), rgb(135, 206, 250, 0.6)), url(../image/clinical-laboratory.jpg)',
    backgroundSize: 'cover',
    height: 'auto'
  }}>
    <Header /> 
    <Nav /> 
      
      <br />
      <BackButton />
      <h1 className='text-1.5xl my-4'>Show Product</h1>
      <br />
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit m-auto p-4'>
          
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Name:</span>
            <span>{product.name}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Quantity:</span>
            <span>{product.quantity}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Expiration Date:</span>
            <span>{product.date ? new Date(product.date).toLocaleDateString('en-US',{ timeZone: 'UTC' }) : 'N/A'}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Category:</span>
            <span>{product.category}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Create Time:</span>
            <span>{new Date(product.createdAt).toLocaleString()}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Last Update Time:</span>
            <span>{new Date(product.updatedAt).toLocaleString()}</span>
          </div>
          </div>
          
          )}
          
        <br />
      <br />
      <br />
      <Footer /> 
    </div>
    </div>
    
  );
};

export default ShowProduct;
