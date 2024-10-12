import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Header from '../components/Header'; 
import Footer from '../components/Footer'; 
import Nav from '../components/Nav';





const EditProduct = ({  }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [date, setDate] = useState();
  const [category, setCategory] = useState(''); 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/products/${id}`)
    .then((response) => {
        console.log('API Response:', response.data); // Add this line for debugging
        setName(response.data.name);
        setQuantity(response.data.quantity);
        const isoDateString = response.data.date; // "2024-02-11T00:00:00.000Z"
        const formattedDate = isoDateString ? isoDateString.slice(0, 10) : null;  
        setDate(formattedDate);
        setCategory(response.data.category);
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        alert('An error happened. Please Check console');
        console.log(error);
      });
  }, [id])
  
  const handleCancelEdit = () => {
    // Custom logic when canceling the delete operation
    console.log('Cancel edit operation');
    navigate('/manage');
  };

  const handleEditProduct = async (event) => {
    event.preventDefault();
    const data = {
      name,
      quantity,
      date,
      category
    };
    setLoading(true);
    try {
        await axios.put(`http://localhost:5555/products/${id}`, data);
        setLoading(false);
        enqueueSnackbar('Product Edited successfully', { variant: 'success' });
        navigate('/manage');

        if (parseInt(quantity, 10) < 5) {
          // Trigger the alert by making a request to the backend
          await axios.post('http://localhost:4588/updateInventory', {
            item: name,
            quantity: parseInt(quantity, 10),
          });
        }
    } catch (error) {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
    }
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
      
      <h3 className='text-1.7xl my-4'>Update a product</h3>
      {loading ? <Spinner /> : ''}
      <br />
      <br />
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-1/2 p-4 mx-auto'>
        
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
      
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditProduct}>
          Save
        </button>
        <button
        className='p-2 bg-sky-300 m-8'
        onClick={handleCancelEdit}
        >
        No, Cancel Edit.
        </button>
    
        </div>
        
        <br />
      <br />
      <br />
      <Footer /> 
    
      </div>
    </div>
    
       
  )
}

export default EditProduct