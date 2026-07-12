import { ReactNode } from 'react';

export default function SafetyProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}