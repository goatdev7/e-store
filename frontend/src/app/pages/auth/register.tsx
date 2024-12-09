import React, { useContext, useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { AuthContext } from "../../context/authContext";
import Router from "next/router";

// Register mutation for client register form
const REGISTER_MUTATION = gql`
    mutation Register($input: registerInput){
        register( input: $input){
            token 
            user{
                id
                username
                email
            }
        }
    }

`;

// register page function
export default function RegisterPage() {
    const { setToken } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        role: '',
    });

    const [register, { loading, error }] = useMutation(REGISTER_MUTATION);

    // function to handle change in the form
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // function to handle submit the form

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { data } = await register({ variables: { input: formData } });
        if (data?.register?.token) {
            setToken(data.register.token);

            // rediret to the login page probably
            // implement Mailgun or sendgrip like api to send 
            // verification email

            // Router.push('/login');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create an Account</h2>
            <input type="text" required value={formData.firstName} placeholder="Enter Your First Name" onChange={handleChange} name="firstName" id="firstName" />
            <input type="text" required value={formData.lastName} placeholder="Enter Your Last Name" onChange={handleChange} name="lastName" id="lastName" />
            <input type="text" required value={formData.username} placeholder="Create a Username" onChange={handleChange} name="username" id="username" />
            <input type="email" required value={formData.email} placeholder="Enter your Email Address" onChange={handleChange} name="email" id="email" />
            <input type="password" required value={formData.password} placeholder="Create a Strong Password" onChange={handleChange} name="password" id="password" />
            <button disabled={loading} type="submit">Register</button>
            {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
        </form>
    )
};