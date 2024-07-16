'use client'

import { createContext, ReactNode, useContext, useState } from "react";

type AuthContextType = {
    name: string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthContextProviderProps = {
    children: ReactNode;
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {

    const name = "Owen"

    return (
        <AuthContext.Provider value={{ name }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};