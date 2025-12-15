import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Employee, UserRole } from '@/types/report';

interface AuthContextType {
  user: Employee | null;
  login: (email: string, password: string) => { success: boolean; role?: UserRole };
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for different roles
const mockUsers: Record<string, Employee> = {
  'employee@redvion.com': {
    id: '1',
    name: 'John Smith',
    email: 'employee@redvion.com',
    department: 'Operations',
    role: 'employee',
  },
  'supervisor@redvion.com': {
    id: '2',
    name: 'Sarah Johnson',
    email: 'supervisor@redvion.com',
    department: 'Safety',
    role: 'supervisor',
  },
  'admin@redvion.com': {
    id: '3',
    name: 'Mike Wilson',
    email: 'admin@redvion.com',
    department: 'Management',
    role: 'admin',
  },
  'client@bhdc.com': {
    id: '4',
    name: 'BHDC Client',
    email: 'client@bhdc.com',
    department: 'External',
    role: 'client',
  },
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Employee | null>(() => {
    const saved = localStorage.getItem('safety_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email: string, password: string): { success: boolean; role?: UserRole } => {
    // Check if email matches any mock user
    const mockUser = mockUsers[email.toLowerCase()];
    
    if (mockUser && password.length >= 4) {
      setUser(mockUser);
      localStorage.setItem('safety_user', JSON.stringify(mockUser));
      return { success: true, role: mockUser.role };
    }
    
    // For any other email, default to employee role
    if (email && password.length >= 4) {
      const defaultUser: Employee = {
        id: Date.now().toString(),
        name: email.split('@')[0],
        email,
        department: 'General',
        role: 'employee',
      };
      setUser(defaultUser);
      localStorage.setItem('safety_user', JSON.stringify(defaultUser));
      return { success: true, role: 'employee' };
    }
    
    return { success: false };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('safety_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
