"use client";

import React, { createContext, useContext, useReducer, useCallback } from "react";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

type ToastAction = { type: "ADD"; toast: Toast } | { type: "REMOVE"; id: number };

interface ToastContextProps {
  showToast: ({ message, type }: { message: string; type?: ToastType }) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

function toastReducer(state: Toast[], action: ToastAction): Toast[] {
  switch (action.type) {
    case "ADD":
      return [...state, action.toast];
    case "REMOVE":
      return state.filter((toast) => toast.id !== action.id);
    default:
      return state;
  }
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, dispatch] = useReducer(toastReducer, []);

  const showToast = useCallback(({ message, type = "info" }: { message: string; type?: ToastType }) => {
    const id = Date.now() + Math.random();
    dispatch({ type: "ADD", toast: { id, message, type } });
    setTimeout(() => {
      dispatch({ type: "REMOVE", id });
    }, 3500);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-6 right-6 z-50 flex flex-col gap-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`
              flex items-center gap-4 px-6 py-4 rounded-xl shadow-2xl border-l-4
              animate-slide-in
              ${
                toast.type === "success"
                  ? "bg-gradient-to-r from-green-500 to-emerald-600 border-green-400"
                  : toast.type === "error"
                  ? "bg-gradient-to-r from-red-500 to-pink-600 border-red-400"
                  : "bg-gradient-to-r from-blue-500 to-indigo-600 border-blue-400"
              }
              backdrop-blur-lg bg-opacity-90
            `}
          >
            <span className="flex items-center justify-center rounded-full bg-white/20 p-2">
              {toast.type === "success" && (
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="12" fill="#22c55e" opacity="0.2" />
                  <path stroke="white" strokeWidth="2" d="M6 13l4 4 8-8" />
                </svg>
              )}
              {toast.type === "error" && (
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="12" fill="#ef4444" opacity="0.2" />
                  <path stroke="white" strokeWidth="2" d="M15 9l-6 6M9 9l6 6" />
                </svg>
              )}
              {toast.type === "info" && (
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="12" fill="#3b82f6" opacity="0.2" />
                  <path stroke="white" strokeWidth="2" d="M12 8v4m0 4h.01" />
                </svg>
              )}
            </span>
            <span className="font-semibold text-white text-base drop-shadow">{toast.message}</span>
          </div>
        ))}
      </div>
      <style jsx global>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </ToastContext.Provider>
  );
}
