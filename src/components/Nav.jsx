import React from 'react';
import { Link } from 'react-router-dom';


function Nav() {
  return (
    
    <nav className="p-2 ">
      <div className="container mx-auto flex items-center justify-center px-4">
        <ul className="flex space-x-4">
          <li>
            <a className="block border border-blue-400 rounded py-2 px-4 bg-blue-400 hover:bg-blue-600 text-white" href="/">Home</a>
          </li>
          <Link to="/manage" className="block border border-blue-400 rounded py-2 px-4 bg-blue-400 hover:bg-blue-600 text-white">
              Update/Edit Product
            </Link>
          
        </ul>
      </div>
    </nav>
        
    
  );
}

export default Nav;