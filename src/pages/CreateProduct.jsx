import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
//import ProductsTable from '../components/home/ProductTable';
import Header from '../components/Header'; 
import Footer from '../components/Footer'; 
import Nav from '../components/Nav';

const CreateProducts = () => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('Reagent'); // Set the default category 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveProduct = (event) => {
    event.preventDefault();
    const data = {
      name,
      quantity,
      date,
      category
    };
    setLoading(true);
    axios
      .post('http://localhost:5555/products', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Product Created successfully', { variant: 'success' });
        navigate('/manage');
      })
      .catch((error) => {
        setLoading(false);
        // alert('An error happened. Please Check console');
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
      
      <br />
      <BackButton />
      <h1 className='text-1.7xl my-4'>Add a product</h1>
      <br />
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[350px] p-4 mx-auto'>
        

        <form onSubmit={handleSaveProduct}>
      {/* Your input fields */}
        <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>
            Name:
            <input type="text" placeholder='Enter the product name' 
            value={name} onChange={(e) => setName(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full' />
            </label>
        </div>

        <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>
            Quantity:
            <input type="number" placeholder='Enter the quantity' 
            value={quantity} onChange={(e) => setQuantity(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'/>
            </label>
        </div>

        <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>
            Date:
            <input type="date" value={date} 
            onChange={(e) => setDate(e.target.value)} 
            className='border-2 border-gray-500 px-4 py-2 w-full'/>
            </label>
        </div>

        {/* Dropdown for category */}
        <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>
            Category:
            <select value={category} 
            onChange={(e) => setCategory(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'>
                <option value="Reagent">Reagent</option>
                <option value="Quality Control">Quality Control</option>
                <option value="Calibrator">Calibrator</option>
                
            </select>
            </label>
        </div>

        {/* Button to trigger saving */}
        <div>
        <button type="submit" className='p-2 bg-sky-300 m-8 w-full mx-auto'>Save</button>
        </div>
        </form>
    
        </div>
    <br />
      <br />
      <br />
      <Footer /> 
      </div>
</div>

       
  );
}

export default CreateProducts;