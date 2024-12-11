import React, { useContext, useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { AuthContext } from "../../src/app/context/authContext";
import LoginForm from "../../src/app/components/loginForm";
import { useRouter } from "next/router";

// login mutation for client login form 
const LOGIN_MUTATION = gql`
    mutation Login($input: loginInput!){
        loginUser(input:$input){
            token
            user {
                id
                username
                email
            }
        }
    }
`;

// login page function
export default function LoginPage() {
    const { setToken } = useContext(AuthContext);
    const [formData, setFormData] = useState({ identifier: '', password: '' });
    const [login, { loading, error }] = useMutation(LOGIN_MUTATION);

    // fucntion to handle change in formdata
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const router = useRouter();

    // handle submit form function
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { data } = await login({ variables: { input: formData } });
        if (data?.login?.token) {
            setToken(data.login.token);
            router.push("/");
            //redirect to home page 
        }

    };

    return (
        <LoginForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            loading={loading}
            error={error}
        />
    );
};
