import React, { useContext, useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { AuthContext } from "../../src/app/context/authContext";
import Router, { useRouter } from "next/router";
import RegisterForm from "@/app/components/registerForm";
import PopupText from "@/app/components/popupText";

// Register mutation for client register form
const REGISTER_MUTATION = gql`
    mutation Register($input: registerInput!){
        registerUser( input: $input){
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
    const router = useRouter();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        role: '',
    });
    const [PopUpVisible, setPopUpVisible] = useState(false);

    const [register, { loading, error }] = useMutation(REGISTER_MUTATION);
    // console.log(formData);
    // console.log(REGISTER_MUTATION);
    // function to handle change in the form
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // function to handle submit the form

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { data } = await register({ variables: { input: formData } });
        console.log(data);

        if (data?.registerUser?.token) {
            setToken(data.registerUser.token);
            setPopUpVisible(true);
            // rediret to the login page probably
            // implement Mailgun or sendgrip like api to send 
            // verification email
            setTimeout(() => {
                setPopUpVisible(false)
                router.push('/');
            }, 4000);
        }
    };

    return (
        <>
            <RegisterForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                loading={loading}
                error={error}
            />
            <PopupText
                message="You have been successfully registered!"
                visible={PopUpVisible}
                onClose={() => setPopUpVisible(false)}
            />
        </>
    )
};