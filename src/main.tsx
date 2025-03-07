import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// import App from './App.tsx'
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SentimentForm from "./components/SentimentForm.tsx";
import SentimentChart from "./components/SentimentChart.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SentimentChart />
      <SentimentForm />
    </QueryClientProvider>

    {/* <App /> */}
  </StrictMode>
);
