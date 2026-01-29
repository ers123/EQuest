import { StateStorage } from 'zustand/middleware';

// Fallback in-memory storage for when localStorage is blocked
const memoryStorage = new Map<string, string>();

export const safeStorage: StateStorage = {
    getItem: (name: string): string | null => {
        try {
            return localStorage.getItem(name);
        } catch (e) {
            // Fallback to memory storage if localStorage access fails
            return memoryStorage.get(name) || null;
        }
    },
    setItem: (name: string, value: string): void => {
        try {
            localStorage.setItem(name, value);
        } catch (e) {
            // Fallback to memory storage
            memoryStorage.set(name, value);
        }
    },
    removeItem: (name: string): void => {
        try {
            localStorage.removeItem(name);
        } catch (e) {
            memoryStorage.delete(name);
        }
    },
};
