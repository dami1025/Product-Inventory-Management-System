import React, { useState } from 'react';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Header from '../components/Header'; 
import Footer from '../components/Footer';
import Nav from '../components/Nav'; 
import BackButton from '../components/BackButton';

const DeleteProduct = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleCustomBack = () => {
    // Custom logic when the back button is clicked
    console.log('Custom back button clicked');
  };
  const handleCancelDelete = () => {
    // Custom logic when canceling the delete operation
    console.log('Cancel delete operation');
    navigate('/manage');
  };
    

  const handleDeleteProduct = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/products/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Product Deleted successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };
  
  return (
    <div className='p-4'>
    <div style={{ 
    backgroundImage: 'linear-gradient(to right, rgb(255, 240, 245, 1), rgb(135, 206, 250, 0.6)), url(../image/clinical-laboratory.jpg)',
    backgroundSize: 'cover',
    height: 'auto'
  }}>
      <Header /> 
      <Nav />
      <BackButton /> 
      
    
      <h1 className='text-1.7xl my-4'>Delete Product</h1>
      <br />
      <br />
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[350px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are you sure you want to Delete this product?</h3>

        <button
          className='p-4 bg-red-600 text-white m-8 w-full'
          onClick={handleDeleteProduct}
        >
          Yes, Delete it.
        </button>
        <button
        className='p-4 bg-sky-300 m-8 text-black w-full'
        onClick={handleCancelDelete}
        >
        No, Go back.
        </button>
          
        
        
      </div>
      
      <br />
      <br />
      <br />
      <br />
      <Footer /> 
      </div>
    </div>
  );
}

export default DeleteProduct;
