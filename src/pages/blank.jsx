
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import ProductTable from '../components/home/ProductTable';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Nav from '../components/Nav';

const UpdateItem = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatedItem, setUpdatedItem] = useState(null); // Track the updated item

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

  const updateItem = async (itemId, updatedData) => {
    try {
      await axios.put(`http://localhost:5555/products/${itemId}`, updatedData);

      // Set the updated item to trigger the alert
      setUpdatedItem(updatedData);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  // Function to trigger the alert
  const triggerAlert = async () => {
    try {
      if (updatedItem) {
        // Trigger the alert after the update
        await axios.post('http://localhost:4588/triggerAlert', {
          item: updatedItem.name,  // Adjust as needed
          quantity: updatedItem.quantity,  // Adjust as needed
        });

        // Fetch the updated product list
        const response = await axios.get('http://localhost:5555/products');
        setProducts(response.data.data);

        // Reset the updatedItem state
        setUpdatedItem(null);
      } else {
        console.error('No updated item to trigger the alert.');
      }
    } catch (error) {
      console.error('Error triggering alert:', error);
    }
  };

  return (
    <div className='p-4'>
      <div
        style={{
          backgroundImage: 'linear-gradient(to right, rgb(255, 240, 245, 1), rgb(135, 206, 250, 0.6)), url(../image/clinical-laboratory.jpg)',
          backgroundSize: 'cover',
          height: '100vh',
        }}
      >
        <Header />
        <Nav />

        <div className='flex justify-between items-center '>
          <h1 className='text-3xl my-8 '>Products List</h1>
          {/* Trigger the updateItem function with a button or any UI element */}
          <button onClick={() => updateItem(itemId, updatedData)}>Update Item</button>
          {/* Add a button to trigger the alert */}
          <button onClick={triggerAlert}>Trigger Alert</button>
          <Link to='/products/create'>
            <MdOutlineAddBox className='text-sky-800 text-4xl' />
          </Link>
        </div>
        {loading ? <Spinner /> : <ProductTable products={products} />}
      </div>
      <Footer />
    </div>
  );
};

export default UpdateItem;
