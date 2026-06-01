export type ToastTone = 'success' | 'warning' | 'error' | 'info';

export interface Toast {
  id: string;
  tone: ToastTone;
  title: string;
  message?: string;
}

export interface NotifyInput {
  tone?: ToastTone;
  title: string;
  message?: string;
  duration?: number;
}

export interface ToastContextValue {
  notify: (input: NotifyInput) => void;
  dismiss: (id: string) => void;
}
