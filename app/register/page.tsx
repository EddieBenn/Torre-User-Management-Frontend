"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CircularProgress } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import hero from "../../public/we.jpg";
import { createUser } from "../axios/functions";
import { useAlert } from "next-alert";
import { Alerts } from "next-alert";

const Register: React.FC = () => {
  const router = useRouter();

  const { addAlert } = useAlert();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
      first_name: Yup.string().required("first name is required"),
      last_name: Yup.string().required("last name is required"),
      phone: Yup.string().min(10,"Invalid phone number").required("phone is required"),
      city: Yup.string().required("city is required"),
      gender: Yup.string().required("gender is required")
  });

  return (
    <div
      className="relative min-h-screen px-3 flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${hero.src})` }}
    >
      <motion.div
        className="bg-gray-800/50 dark:bg-gray-800/80 p-6 rounded-lg shadow-lg max-w-md w-full"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-bold mb-4 text-center text-white">
          Create User
        </h2>

        <Formik
          initialValues={{ first_name: "",
            last_name: "",
            email: "",
            phone: "",
            city: "",
            gender: ""
          }}

          validationSchema={validationSchema}

          onSubmit={async (values, { setSubmitting, setErrors }) => {
            setSubmitting(true);
            try {
              console.log('val', values)
              const response = await createUser(values);
              if (response?.status === 201) {
                addAlert('User Created Successfully:', response.data.message, 'success');
               return router.push("/");
              } else {
                addAlert('Error:', response?.data?.message, 'error');
              }
            } catch (error: any) {
              if (error?.response) {
                addAlert('Error creating user:', error.response.data, 'error');
              } else if (error?.request) {
                addAlert('No response received:', error.request, 'error');
              } else {
                addAlert('Error setting up request:', error.message, 'error');
              }
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col space-y-4">
              <Field
                type="text"
                name="first_name"
                placeholder="First Name"
                className="border p-3 rounded w-full"
              />
              <ErrorMessage
                name="first_name"
                component="div"
                className="text-red-500 text-sm"
              />

              <Field
                type="text"
                name="last_name"
                placeholder="Last Name"
                className="border p-3 rounded w-full"
              />
              <ErrorMessage
                name="last_name"
                component="div"
                className="text-red-500 text-sm"
              />

              <Field
                type="email"
                name="email"
                placeholder="Email"
                className="border p-3 rounded w-full"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />

              <Field
                type="text"
                name="phone"
                placeholder="Phone Number"
                className="border p-3 rounded w-full"
              />
              <ErrorMessage
                name="phone"
                component="div"
                className="text-red-500 text-sm"
              />

              <Field
                as="select"
                name="city"
                className="border p-3 rounded w-full"
              >
                <option value="" label="Select your city" />
                <option value="Lagos" label="Lagos" />
                <option value="Abuja" label="Abuja" />
                <option value="Ibadan" label="Ibadan" />
                <option value="Uyo" label="Uyo" />
                <option value="Washington" label="Washington" />
              </Field>
              <ErrorMessage
                name="city"
                component="div"
                className="text-red-500 text-sm"
              />

              <Field
                as="select"
                name="gender"
                className="border p-3 rounded w-full"
              >
                <option value="" label="Select your gender" />
                <option value="male" label="Male" />
                <option value="female" label="Female" />
              </Field>
              <ErrorMessage
                name="gender"
                component="div"
                className="text-red-500 text-sm"
              />

              <motion.button
                type="submit"
                className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition"
                whileTap={{ scale: 0.95 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Create User"
                )}
              </motion.button>
            </Form>
          )}
        </Formik>
      </motion.div>
      <Alerts
        position="bottom-right"
        direction="left"
        timer={4000}
        className="rounded-md !w-80 z-[100]"
      >
      </Alerts>
    </div>
  );
};

export default Register;
