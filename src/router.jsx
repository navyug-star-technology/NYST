import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen.ts";
export const getRouter = () => {
    // One client per request: a module-level QueryClient leaks cached data between SSR requests.
    const queryClient = new QueryClient();
    const router = createRouter({
        routeTree,
        context: { queryClient },
        scrollRestoration: true,
        defaultPreload: "intent",
        defaultPreloadStaleTime: 30_000,
        // Lets Query own freshness; set caching defaults on the QueryClient, not the router.
    });
    return router;
};
