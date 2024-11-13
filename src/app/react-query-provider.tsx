"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// 다른 컴포넌트에서도 사용할 수 있게 export 해준다.
export const queryClient = new QueryClient();

export default function ReactQueryProvider({ children }: { children: ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
