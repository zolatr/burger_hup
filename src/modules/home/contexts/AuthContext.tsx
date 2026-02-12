import { createContext, useContext, useEffect, useState } from 'react';
import { User, useStore } from '@store/useStore';
import { z } from 'zod';
import { toast } from 'sonner';

// Zod Schemas
export const loginSchema = z.object({
  email: z.string().email("Geçersiz email adresi"),
  password: z.string().min(6, "Şifre en az 6 karakter olmalı"),
});

export const registerSchema = z.object({
  name: z.string().min(2, "Ad en az 2 karakter olmalı"),
  email: z.string().email("Geçersiz email adresi"),
  phone: z.string().min(10, "Geçersiz telefon numarası"),
  password: z.string().min(6, "Şifre en az 6 karakter olmalı"),
});

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, phone: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, setUser } = useStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Sync with store if needed, mostly handled by persist
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      // Validate input
      loginSchema.parse({ email, password });

      // Mock API delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Simple role assignment based on credentials for testing
      // Real app would get this from backend
      let role: User['role'] = 'customer';
      if (email.includes('admin') || email === 'admin@burgerhub.com') role = 'admin';
      if (email.includes('chef')) role = 'chef';
      if (email.includes('waiter')) role = 'waiter';
      if (email.includes('courier')) role = 'courier';

      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: email.split('@')[0], // Fallback name
        email: email,
        phone: '+90 555 123 4567',
        role: role
      };

      setUser(mockUser);
      toast.success("Giriş başarılı!");

    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error("Giriş yapılamadı. Lütfen bilgilerinizi kontrol edin.");
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, phone: string, password: string) => {
    try {
      setIsLoading(true);
      // Validate input
      registerSchema.parse({ name, email, phone, password });

      // Mock API delay
      await new Promise(resolve => setTimeout(resolve, 800));

      const mockUser: User = {
        id: Date.now().toString(),
        name,
        email,
        phone,
        address: '',
        role: 'customer' // Always default to customer for registration
      };

      setUser(mockUser);
      toast.success("Kayıt başarılı! Hoş geldiniz.");

    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error("Kayıt işlemi başarısız.");
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    toast.info("Çıkış yapıldı");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
