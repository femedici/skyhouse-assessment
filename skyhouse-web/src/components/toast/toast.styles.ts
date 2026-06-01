import styled, { keyframes } from 'styled-components';
import type { DefaultTheme } from 'styled-components';
import type { ToastTone } from './toast.types';

const slideIn = keyframes`
  from { opacity: 0; transform: translateY(-8px) scale(0.98); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
`;

function tonePalette(theme: DefaultTheme, tone: ToastTone) {
  switch (tone) {
    case 'success':
      return theme.color.tier.high;
    case 'warning':
      return theme.color.tier.medium;
    case 'error':
      return theme.color.tier.low;
    case 'info':
    default:
      return theme.color.accent;
  }
}

export const Viewport = styled.div`
  position: fixed;
  top: ${({ theme }) => theme.space.xl};
  right: ${({ theme }) => theme.space.xl};
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
  width: min(360px, calc(100vw - 32px));
  pointer-events: none;
`;

export const Card = styled.div<{ $tone: ToastTone }>`
  pointer-events: auto;
  display: flex;
  gap: ${({ theme }) => theme.space.md};
  padding: ${({ theme }) => `${theme.space.md} ${theme.space.lg}`};
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.md};
  animation: ${slideIn} 240ms cubic-bezier(0.22, 1, 0.36, 1);
`;

export const Glyph = styled.span<{ $tone: ToastTone }>`
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  margin-top: 1px;
  border-radius: ${({ theme }) => theme.radius.pill};
  display: grid;
  place-items: center;
  color: ${({ theme, $tone }) => tonePalette(theme, $tone).text};
  background: ${({ theme, $tone }) => tonePalette(theme, $tone).soft};

  svg {
    width: 14px;
    height: 14px;
  }
`;

export const Body = styled.div`
  flex: 1;
  min-width: 0;
`;

export const Title = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.text.primary};
`;

export const Message = styled.p`
  margin-top: 2px;
  font-size: 13px;
  line-height: 1.45;
  color: ${({ theme }) => theme.color.text.secondary};
  word-break: break-word;
`;

export const CloseButton = styled.button`
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  border: none;
  background: transparent;
  border-radius: ${({ theme }) => theme.radius.sm};
  color: ${({ theme }) => theme.color.text.tertiary};
  cursor: pointer;
  display: grid;
  place-items: center;
  transition: background 140ms ease, color 140ms ease;

  &:hover {
    background: ${({ theme }) => theme.color.surfaceMuted};
    color: ${({ theme }) => theme.color.text.primary};
  }

  svg {
    width: 14px;
    height: 14px;
  }
`;
