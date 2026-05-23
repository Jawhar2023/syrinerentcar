import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type IntroGateContextValue = {
  introVisible: boolean;
  dismissIntro: () => void;
};

const IntroGateContext = createContext<IntroGateContextValue | null>(null);

export function IntroGateProvider({ children }: { children: ReactNode }) {
  const [introVisible, setIntroVisible] = useState(true);
  const dismissIntro = () => setIntroVisible(false);
  const value = useMemo(() => ({ introVisible, dismissIntro }), [introVisible]);
  return <IntroGateContext.Provider value={value}>{children}</IntroGateContext.Provider>;
}

export function useIntroGate() {
  const ctx = useContext(IntroGateContext);
  if (!ctx) {
    throw new Error("useIntroGate must be used within IntroGateProvider");
  }
  return ctx;
}
