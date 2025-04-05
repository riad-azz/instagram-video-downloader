import { QueryClient } from "@tanstack/react-query";

import { queriesConfig } from "./config";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: queriesConfig,
  },
});

export { queryClient };
