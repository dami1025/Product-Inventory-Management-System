import { Link } from 'react-router-dom';
import { BsInfoCircle } from 'react-icons/bs';
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";


const ProductsTable = ({ products, showManageColumn = true }) => {
  return (
    <div className='overflow-x-auto'>
      <table className='w-full border-separate border-spacing-2 overflow-hidden table-auto'>
        <thead>
          <tr>
            <th className='border border-slate-600 rounded-md'>No</th>
            <th className='border border-slate-600 rounded-md'>Name</th>
            <th className='border border-slate-600 rounded-md '>Quantity</th>
            <th className='border border-slate-600 rounded-md '>Expiration Date</th>
            <th className='border border-slate-600 rounded-md'>Category </th>
            {showManageColumn && (
              <th className='border border-slate-600 rounded-md'>Manage </th>
            )}
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product._id} className='h-8'>
              <td className='border border-slate-700 rounded-md text-center'>{index + 1}</td>
              <td className='border border-slate-700 rounded-md'>{product.name}</td>
              <td className='border border-slate-700 rounded-md text-center'>{product.quantity}</td>
              <td className='border border-slate-700 rounded-md text-center'>{product.date ? new Date(product.date).toLocaleDateString('en-US', { timeZone: 'UTC' }) : 'N/A'}</td>
              <td className='border border-slate-700 rounded-md'>{product.category}</td>
              {showManageColumn && (
                <td className='border border-slate-700 rounded-md text-center'>
                  <div className='flex justify-center gap-x-4'>
                    <Link to={`/products/details/${product._id}`}>
                      <BsInfoCircle className='text-2xl text-green-800' />
                    </Link>
                    <Link to={`/products/edit/${product._id}`}>
                      <FaRegEdit className='text-2xl text-yellow-600' />
                    </Link>
                    <Link to={`/products/delete/${product._id}`}>
                      <RiDeleteBin2Fill className='text-2xl text-red-600' />
                    </Link>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
