import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import * as authApi from '../lib/api/auth';

interface AuthContextType {
    user: User | null;
    session: Session | null;
    loading: boolean;
    signUp: typeof authApi.signUp;
    signIn: typeof authApi.signIn;
    signInWithGoogle: typeof authApi.signInWithGoogle;
    signInWithLinkedIn: typeof authApi.signInWithLinkedIn;
    signOut: typeof authApi.signOut;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Get initial session
        authApi.getCurrentSession().then((session) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        });

        // Listen for auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const value: AuthContextType = {
        user,
        session,
        loading,
        signUp: authApi.signUp,
        signIn: authApi.signIn,
        signInWithGoogle: authApi.signInWithGoogle,
        signInWithLinkedIn: authApi.signInWithLinkedIn,
        signOut: authApi.signOut,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
