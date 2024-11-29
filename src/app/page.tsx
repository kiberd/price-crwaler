'use client'

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

import TopBar from "./components/TopBar";
import Container from "./components/Container";


const queryClient = new QueryClient();

export default function Home() {

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <TopBar />
        <Container />
      </div>
    </QueryClientProvider>
  );
}
