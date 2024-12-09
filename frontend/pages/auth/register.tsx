import React, { useContext, useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { AuthContext } from "../../src/app/context/authContext";
import Router from "next/router";
import RegisterForm from "@/app/components/registerForm";

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
        <RegisterForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            loading={loading}
            error={error}
        />
    )
};