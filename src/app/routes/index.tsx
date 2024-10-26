import { BrowserRouter as Router } from "react-router-dom";

type AppRouterProps = {
  children: React.ReactNode;
};

export const AppRouter = ({ children }: AppRouterProps) => {
  return <Router>{children}</Router>;
};
