"use client"
import { ReactNode } from 'react';
import { AuthProvider } from './session/sessionContext';
import { TradesProvider } from './trades/trades';
import { UserProvider } from './user/userContext';


interface ProvidersProps {
    children: ReactNode; 
}

export function Providers({ children }: ProvidersProps) {
    return (
        <AuthProvider>
            <UserProvider>
                <TradesProvider>
                    {children}
                </TradesProvider>
            </UserProvider>
        </AuthProvider>
    );
}