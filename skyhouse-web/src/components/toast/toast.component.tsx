import type { Toast, ToastTone } from './toast.types';
import * as S from './toast.styles';

const GLYPHS: Record<ToastTone, JSX.Element> = {
  success: (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.5 8.5l3 3 6-7" />
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 5v4" />
      <path d="M8 11.5h.01" />
    </svg>
  ),
  error: (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 5l6 6M11 5l-6 6" />
    </svg>
  ),
  info: (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 7.5v4" />
      <path d="M8 4.5h.01" />
    </svg>
  ),
};

const CloseGlyph = (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <path d="M4 4l8 8M12 4l-8 8" />
  </svg>
);

interface ToastViewportProps {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}

export function ToastViewport({ toasts, onDismiss }: ToastViewportProps) {
  if (toasts.length === 0) return null;

  return (
    <S.Viewport role="region" aria-label="Notifications">
      {toasts.map((toast) => (
        <S.Card key={toast.id} $tone={toast.tone} role="status">
          <S.Glyph $tone={toast.tone} aria-hidden>
            {GLYPHS[toast.tone]}
          </S.Glyph>
          <S.Body>
            <S.Title>{toast.title}</S.Title>
            {toast.message && <S.Message>{toast.message}</S.Message>}
          </S.Body>
          <S.CloseButton type="button" aria-label="Dismiss notification" onClick={() => onDismiss(toast.id)}>
            {CloseGlyph}
          </S.CloseButton>
        </S.Card>
      ))}
    </S.Viewport>
  );
}
