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

export default function LoginPage() {
    const [visible, setSpinnerVisible] = useState(false);
    const { setToken, setRole } = useContext(AuthContext);
    const [formData, setFormData] = useState({ identifier: '', password: '' });
    const [login, { loading, error }] = useMutation(LOGIN_MUTATION);
    const router = useRouter();

    // handle change in form data remains unchanged
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // updated handleSubmit receives form values from Ant Design Form
    const handleSubmit = async (values: { identifier: string; password: string }) => {
        values.identifier = values.identifier.trim();
        try {
            const { data } = await login({ variables: { input: values } });
            setToken(data.loginUser.token);
            setRole(data.loginUser.user.role);
            setSpinnerVisible(true);
            setTimeout(() => {
                router.push("/");
            }, 2000);

        } catch (err) {
            console.error(err);
        }

    };

    return (
        <>
            {visible && <LoadingSpinner />}
            <LoginForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                loading={loading}
                error={error}
            />
        </>
    );
}
