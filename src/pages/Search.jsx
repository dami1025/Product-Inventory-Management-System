import React, { useState, useEffect } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Assuming you fetch products from an API
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/products`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  
  // Update filtered products when searchQuery changes
  useEffect(() => {
    const lowercaseQuery = searchQuery.toLowerCase();
    const filtered = products.filter(
      (product) => product.name.toLowerCase().includes(lowercaseQuery)
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
