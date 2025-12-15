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
const mockUsers: Record<string, { user: Employee; password: string }> = {
  'employee@redvion.com': {
    user: {
      id: '1',
      name: 'John Smith',
      email: 'employee@redvion.com',
      department: 'Operations',
      role: 'employee',
    },
    password: 'test',
  },
  'supervisor@redvion.com': {
    user: {
      id: '2',
      name: 'Sarah Johnson',
      email: 'supervisor@redvion.com',
      department: 'Safety',
      role: 'supervisor',
    },
    password: 'test',
  },
  'admin@redvion.com': {
    user: {
      id: '3',
      name: 'Mike Wilson',
      email: 'admin@redvion.com',
      department: 'Management',
      role: 'admin',
    },
    password: 'admin123',
  },
  'client@bhdc.com': {
    user: {
      id: '4',
      name: 'Qatar Client',
      email: 'client@Qatar.com',
      department: 'External',
      role: 'client',
    },
    password: 'test',
  },
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Employee | null>(() => {
    const saved = localStorage.getItem('safety_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email: string, password: string): { success: boolean; role?: UserRole } => {
    const record = mockUsers[email.toLowerCase()];
    if (record && record.password === password) {
      setUser(record.user);
      localStorage.setItem('safety_user', JSON.stringify(record.user));
      return { success: true, role: record.user.role };
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
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
