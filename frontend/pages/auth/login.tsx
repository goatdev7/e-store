import React, { useContext, useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { AuthContext } from "../../src/app/context/authContext";
import LoginForm from "../../src/app/components/loginForm";
import { useRouter } from "next/router";
import LoadingSpinner from "@/app/components/loadingSpinner";

// login mutation for client login form 
const LOGIN_MUTATION = gql`
    mutation Login($input: loginInput!){
        loginUser(input:$input){
            token
            user {
                id
                username
                email
                role
            }
        }
    }
`;

// login page function
export default function LoginPage() {
    const [visible, setSpinnerVisible] = useState(false);
    const { setToken, setRole } = useContext(AuthContext);
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
        if (data?.loginUser?.token) {
            const token = data.loginUser.token;
            const role = data.loginUser.user.role;
            console.log("Fetched role is:", role);
            // await fetch(`/api/set-token?token=${token}`);
            setSpinnerVisible(true);
            setTimeout(() => {
                setSpinnerVisible(true);
                setToken(token);
                setRole(role);
                router.push("/");
            }, 2000);
            //redirect to home page 
        }

    };

    return (
        <>
            { visible && <LoadingSpinner />}
            <LoginForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                loading={loading}
                error={error}
            />
        </>
    );
};
