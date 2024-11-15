"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Skeleton, TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import './globals.css';
import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import Hero from './components/Hero';
import { useAlert } from "next-alert";
import { Alerts } from "next-alert";
import { allusers } from './axios/functions';

const ITEMS_PER_PAGE = 6;

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([])
  const { addAlert } = useAlert();

  const getAllUsers = async () => {
    try {
      setLoading(true)
      const response:any = await allusers(searchTerm, selectedCity);
      
      if (response?.status === 200) {
        setUsers(response.data.users)
        return setLoading(false)
      } else {
        addAlert('Unexpected response status:', response.status, 'error');
        return setLoading(false)
      }
    } catch (error: any) {
      if (error?.response) {
        addAlert('Error fetching users:', error.response.data, 'error');
        return setLoading(false)
      } else if (error?.request) {
        addAlert('No response received:', error.request, 'error');
        return setLoading(false)
      } else {
        addAlert('Error setting up request:', error.message, 'error');
        return setLoading(false)
      }
    }
  };
  

  useEffect(() => {
    setLoading(true);
    getAllUsers()
    // return () => clearTimeout(timer);
  }, [searchTerm, selectedCity]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); 
  };

  const handleCityChange = (event: React.ChangeEvent<{ value: string }> | any) => {
    setSelectedCity(event.target.value as string);
    setCurrentPage(1); 
  };

  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);
  const displayedUsers = users.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <Hero />
      <div id='users' className="p-4 lg:px-[7rem] mt-4">
        <div className="mb-4 flex flex-col sm:flex-row justify-between items-center">
        <TextField
          variant="outlined"
          label="Find users by name"
          value={searchTerm}
          onChange={handleSearch}
          className="mb-2 sm:mb-0 sm:w-1/3 w-full dark:bg-gray-800 dark:text-white"
          InputLabelProps={{
            style: { color: 'grey' },
            className: 'dark:text-gray-300',
          }}
          InputProps={{
            style: {
              backgroundColor: '',
              color: 'grey',
              borderColor: 'rgba(255, 255, 255, 0.3)',
            },
            classes: { notchedOutline: 'dark:border-gray-500' },
          }}
        />

      <FormControl variant="outlined" className="w-full sm:w-1/4 ml-2 dark:bg-gray-800 dark:text-white">
        <InputLabel className="dark:text-gray-300">Filter by City</InputLabel>
        <Select
          value={selectedCity}
          onChange={handleCityChange}
          label="city"
          style={{
            backgroundColor: '',
            color: 'gray',
            borderColor: 'rgba(255, 255, 255, 0.3)',
          }}
          MenuProps={{
            PaperProps: {
              style: {
                color: 'grey',
              },
            },
          }}
        >
          <MenuItem value="">
            <em className='text-gray-400'>All</em>
          </MenuItem>
          <MenuItem value="lagos">Lagos</MenuItem>
          <MenuItem value="abuja">Abuja</MenuItem>
          <MenuItem value="ibadan">Ibadan</MenuItem>
          <MenuItem value="uyo">Uyo</MenuItem>
          <MenuItem value="washington">Washington</MenuItem>
        </Select>
      </FormControl>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? (
            Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
              <Skeleton 
                key={index} 
                variant="rectangular" 
                width="100%" 
                height={250} 
                animation="pulse" 
                className="mb-4 rounded-lg" 
                style={{
                  backgroundColor: 'rgba(200, 200, 200, 0.2)',
                  borderRadius: '10px',
                  transform: 'scale(1)',
                  transition: 'transform 0.3s ease-in-out',
                }}
              />
            ))
          ) : (
            displayedUsers?.map((user:any) => (
              <div key={user.id} className="block bg-white dark:bg-gray-800 hover:scale-105 transition-all dark:border-blue-400 dark:border rounded-lg shadow-md p-4">
                <Link href={`/user/${user.id}`}>
                  <img src="/guyy1.jpeg" alt={`${user.first_name} ${user.last_name}`} className="w-full h-48 object-cover rounded-md mb-2" />
                  <h2 className="text-xl dark:text-white text-black font-bold mb-2">{user.first_name} {user.last_name}</h2>
                  <p className="text-lg font-semibold text-green-500 mb-1">{user.email}</p>
                  <p className="text-lg font-semibold text-green-500 mb-1">{user.phone}</p>
                  <p className="text-lg font-semibold text-green-500 mb-1">{user.city}</p>
                  <p className="text-lg font-semibold text-green-500 mb-1">{user.gender}</p>
                </Link>
                <Link href={`/user/${user.id}`}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  className="mt-2"
                >
                  View User
                </Button>
                </Link>
              </div>
            ))
          )}
        </div>

        {!loading && totalPages > 1 && (
          <div className="flex justify-end mt-5 my-10">
            <Button 
              disabled={currentPage === 1} 
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} 
              className="mr-2"
            >
              <ArrowLeft/>
              Previous
            </Button>
            <Button 
              disabled={currentPage === totalPages} 
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            >
              Next
              <ArrowRight/>
            </Button>
          </div>
        )}
      </div>
      <Alerts
        position="top-right"
        direction="right"
        timer={3000}
        className="rounded-md relative z-50 !w-80"
      >
      </Alerts>
    </>
  );
};

export default Home;
