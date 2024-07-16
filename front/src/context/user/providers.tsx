"use client"
import { ReactNode } from 'react';
import { AuthProvider } from '../session/session';
import { TradesProvider } from '../trades/trades';
import { UserProvider } from './user';


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