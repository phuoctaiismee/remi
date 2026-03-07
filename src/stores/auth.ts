'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {
  user: any | null;
}

interface Actions {
  setUser: (user: any | null) => void;
}

export const useAuthStore = create<State & Actions>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: any | null) => set({ user }),
    }),
    {
      name: 'store/auth',
      version: 1,
    },
  ),
);
