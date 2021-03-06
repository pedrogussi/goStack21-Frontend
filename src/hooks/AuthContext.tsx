import React, {createContext, useCallback, useState, useContext} from  'react';
import api from '../services/apiClient';

interface AuthState {
   token: string;
   user: object; 
}

interface SignInCredatials {
    email:string,
    password:string
}

interface AuthContextProps {
    user: object;
    signIn(credatials:SignInCredatials):Promise<void>;
    signOut():void 
}

 const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

 const AuthProvider:React.FC = ({children}) => {

    const [data, setData] = useState<AuthState >(() => {

        const token = localStorage.getItem('@GoBarber:token');
        const user = localStorage.getItem('@GoBarber:user');

        if (token && user) {
            return {token, user: JSON.parse(user)}
        }

        return {} as AuthState;
    })

    const signIn = useCallback(async({email, password}) => {
        const response = await api.post('sessions', {
           email,
           password, 
        });

        const {token,user} = response.data;

        localStorage.setItem('@GoBarber:token', token);
        localStorage.setItem('@GoBarber:user', JSON.stringify(user));

        setData({token, user})

    },[]);

    const signOut = useCallback(() => {
        localStorage.removeItem('@GoBarber:token');
        localStorage.removeItem('@GoBarber:user'); 

        setData({} as AuthState)
    },[])
    return (
        <AuthContext.Provider value={{user: data.user, signIn, signOut}}  >
            {children}
        </AuthContext.Provider>
    )
}
function useAuth():AuthContextProps {
    const context  = useContext(AuthContext);

    if(!context) {
       throw new Error('useAuth must be used within as AuthProvider');
    }
    return context;
}


export { AuthProvider, useAuth};
