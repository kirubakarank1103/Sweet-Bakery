// ─── Auth Context ────────────────────────────────────────────────
import { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user,    setUser]    = useState(() => JSON.parse(localStorage.getItem('sv_user') || 'null'));
  const [loading, setLoading] = useState(false);

  // Keep localStorage in sync
  useEffect(() => {
    if (user) localStorage.setItem('sv_user', JSON.stringify(user));
    else      localStorage.removeItem('sv_user');
  }, [user]);

  const register = async (name, email, password, phone) => {
    setLoading(true);
    try {
      const { data } = await api.post('/users/register', { name, email, password, phone });
      localStorage.setItem('sv_token', data.token);
      setUser(data.user);
      toast.success(data.message);
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed.';
      toast.error(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const { data } = await api.post('/users/login', { email, password });
      localStorage.setItem('sv_token', data.token);
      setUser(data.user);
      toast.success(data.message);
      return { success: true, isAdmin: data.user.isAdmin };
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed.';
      toast.error(msg);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('sv_token');
    localStorage.removeItem('sv_user');
    setUser(null);
    toast.success('Logged out. See you soon! 👋');
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout, isAdmin: user?.isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);