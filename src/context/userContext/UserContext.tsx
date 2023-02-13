import React from "react";
import { createContext } from "react";


export type UserRole = 'admin' | 'restricted' | 'guest';

export type User = {
    name: string;
    role: UserRole;
}

export type UserContextType = {
    user: User;
    updateUserRole: (role: UserRole) => void;
}

const UserContext = createContext<UserContextType>({} as UserContextType);

export type UserProviderProps = {
    children: React.ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = React.useState<User>({ name: 'David Orozco', role: 'guest' });

    const updateUserRole = (role: UserRole) => {
        setUser({ ...user, role });
    }

    return (
        <UserContext.Provider value={{ user, updateUserRole }}>
            {children}
        </UserContext.Provider>
    );
}

const useUserProvider = () => {
    const context = React.useContext(UserContext);

    if (context === undefined) {
        throw new Error('useUserProvider must be used within a UserProvider');
    }

    return context;
}

export { UserProvider, useUserProvider }