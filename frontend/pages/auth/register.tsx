import React, { useContext, useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { AuthContext } from "../../src/app/context/authContext";
import { useRouter } from "next/router";
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
                role
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
        role: 'user',
    });
    const [PopUpVisible, setPopUpVisible] = useState(false);

    const [register, { loading, error }] = useMutation(REGISTER_MUTATION);

    // function to handle change in the form
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // function to handle submit the form

    const handleSubmit = async (values: { firstName: string; lastName: string; username: string; email: string; password: string; role: string }) => {
        values.username = values.username.trim();
        values.email = values.email.trim();
        values.firstName = values.firstName.trim();
        values.lastName = values.lastName.trim();
        try{
            const { data } = await register({ variables: { input: formData } });
            setToken(data.registerUser.token);
            setPopUpVisible(true);
            // rediret to the login page probably
            // implement Mailgun or sendgrip like api to send 
            // verification email
            setTimeout(() => {
                setPopUpVisible(false)
                router.push('/');
            }, 4000);

        }catch(err){
            console.error(err);
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