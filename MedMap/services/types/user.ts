export interface User {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin' | 'policy_maker';
  }
  
  export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    setUser: (user: User | null) => void;
    setToken: (token: string | null) => void;
    logout: () => void;
  }
  