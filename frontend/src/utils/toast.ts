import { gooeyToast, type GooeyToastOptions, type GooeyPromiseData } from 'goey-toast';
import React from 'react';

export type GooeyToastType = 'default' | 'success' | 'error' | 'warning' | 'info';

export interface ToastOptions extends Omit<GooeyToastOptions, 'description'> {
    description?: React.ReactNode;
}

/**
 * Reusable toast helper wrapping gooeyToast
 */
export const showToast = {
    /**
     * Display a success toast
     */
    success: (title: string, description?: React.ReactNode, options?: ToastOptions) => {
        return gooeyToast.success(title, {
            description,
            ...options,
        });
    },

    /**
     * Display an error toast
     */
    error: (title: string, description?: React.ReactNode, options?: ToastOptions) => {
        return gooeyToast.error(title, {
            description,
            ...options,
        });
    },

    /**
     * Display an info toast
     */
    info: (title: string, description?: React.ReactNode, options?: ToastOptions) => {
        return gooeyToast.info(title, {
            description,
            ...options,
        });
    },

    /**
     * Display a warning toast
     */
    warning: (title: string, description?: React.ReactNode, options?: ToastOptions) => {
        return gooeyToast.warning(title, {
            description,
            ...options,
        });
    },

    /**
     * Display a default neutral toast
     */
    custom: (title: string, options?: ToastOptions) => {
        return gooeyToast(title, options);
    },

    /**
     * Wrap an async promise with loading -> success/error state transitions
     */
    promise: <T>(
        promise: Promise<T>,
        data: GooeyPromiseData<T>
    ) => {
        return gooeyToast.promise(promise, data);
    },

    /**
     * Dismiss toasts by ID, filter by type, or clear all
     */
    dismiss: (idOrFilter?: string | number | { type: GooeyToastType | GooeyToastType[] }) => {
        return gooeyToast.dismiss(idOrFilter);
    },

    /**
     * Update an active toast in-place
     */
    update: (id: string | number, options: Parameters<typeof gooeyToast.update>[1]) => {
        return gooeyToast.update(id, options);
    }
};

export default showToast;
