import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import ProductTable from '../components/home/ProductTable';
import Header from '../components/Header'; 
import Footer from '../components/Footer'; 
import Nav from '../components/Nav';


const UpdateItem = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');

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

  return (
    <div className='p-4'>
        
        <div style={{ 
    backgroundImage: 'linear-gradient(to right, rgb(255, 240, 245, 1), rgb(135, 206, 250, 0.6)), url(../image/clinical-laboratory.jpg)',
    backgroundSize: 'cover',
    height: '100vh'
  }}>
    {/*"bg-local bg-center bg-no-repeat relative" style={{ backgroundImage: 'url(../public/image/clinical-laboratory.jpg)',backgroundSize: 'cover',height: '100vh' }}>*/}
      <Header /> 
      <Nav /> 
      
    
      <div className='flex justify-between items-center '>
        <h1 className='text-3xl my-8 '>Products List</h1>
        <Link to='/products/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === 'table' ? (
        <ProductTable products={products} />
      
      ):null}
    </div>
    <Footer /> 
    </div>
   
  );
};

export default UpdateItem;
