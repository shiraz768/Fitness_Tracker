import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Website_Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <>
            <div className='flex justify-between px-14 py-6 w-full flex-col top-0 fixed shadow-md bg-blue-900 text-white z-50 sm:flex-row'>
                <div className='navLogo'>
                    <p className='font-bold'>Fitness Tracker</p>
                </div>

                <button
                    onClick={toggleMenu}
                    className='sm:hidden flex items-center text-white'
                    aria-label="Toggle Navigation Menu"
                >
                    <span>&#9776;</span>
                </button>

          
                <div className={`navItems ${menuOpen ? 'block' : 'hidden'} sm:block`}>
                    <ul className='flex flex-col justify-center items-center sm:flex-row  sm:space-y-0 sm:ml-auto space-y-4 sm:space-x-6'>
                        <li>
                            <NavLink 
                                to="/" 
                                className="rounded hover:bg-blue-500 py-5 px-2"
                                
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/about" 
                                className="rounded hover:bg-blue-500 py-5 px-2"
                                
                            >
                                About Us
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/reviews" 
                                className="rounded hover:bg-blue-500 py-5 px-2"
                             
                            >
                                Reviews
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/feedback" 
                                className="rounded hover:bg-blue-500 py-5 px-2"
                                
                            >
                                Feedback
                            </NavLink>
                        </li>
                        <li>
                        <NavLink 
                                to="/login" 
                                className="rounded  bg-blue-500 py-5 px-5"
                               
                            >
                                login
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Website_Navbar;
