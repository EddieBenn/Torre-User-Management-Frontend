
"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Skeleton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAlert } from "next-alert";
import { Alerts } from "next-alert"; 
import { singleUser } from '@/app/axios/functions';

interface UserPageProps {
  params: { id: string };
}

const UserPage: React.FC<UserPageProps> = ({ params }) => {

  const [user, setUser] = useState<any>({})

  const [loading, setLoading] = useState(true);

  const { addAlert } = useAlert();

  const getSingleUser = async () => {
    try {

      setLoading(true)
      const response = await singleUser(params.id);
      if (response?.status === 200) {
        setUser(response.data)
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

  useEffect(()=> {
    setLoading(true)
    getSingleUser()
  },[])
  return (
    <>
           {loading ? (
            Array.from({ length: 1 }).map((_, index) => (
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
    <motion.div 
      className="p-4 lg:px-[7rem]"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link href="/" className="text-blue-500 mb-4 inline-block">
        <ArrowBack /> Back to Users
      </Link>
      <motion.div 
        className="flex flex-col lg:flex-row bg-white dark:bg-gray-800 rounded-lg shadow-md p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <motion.img
          src='/guyy1.jpeg'
          width= '100px'
          alt={user?.first_name}
          className="w-full lg:w-1/2 h-64 object-cover rounded-md mb-4 lg:mb-0 lg:mr-4"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        />
        <div className="flex flex-col justify-between">
          <motion.h1 
            className="text-2xl font-bold dark:text-white text-black mb-2"
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.4 }}
          >
            {user?.first_name} {user.last_name}
          </motion.h1>
          <p className="text-lg font-semibold text-green-500 mb-1">{user.email}</p>
          <p className="text-sm text-gray-500 mb-2">{user.phone}</p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">{user.city}</p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">{user.gender}</p>
        </div>
        <Alerts
			position="top-right"
			direction="right"
			timer={3000}
			className="rounded-md relative z-50 !w-80"
		>
        </Alerts>
      </motion.div>
    </motion.div>
  )}
  </>
)
};

export default UserPage;
