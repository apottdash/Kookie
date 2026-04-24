import { Skeleton } from "@/components/ui/skeleton";
import {
  Navigate,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import Layout from "./components/Layout";

// Lazy-loaded pages
const HomePage = lazy(() => import("./pages/HomePage"));
const LinksPage = lazy(() => import("./pages/LinksPage"));
const SongsPage = lazy(() => import("./pages/SongsPage"));
const FanFictionPage = lazy(() => import("./pages/FanFictionPage"));
const FeedPage = lazy(() => import("./pages/FeedPage"));
const PostDetailPage = lazy(() => import("./pages/PostDetailPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const WatchlistPage = lazy(() => import("./pages/WatchlistPage"));

function PageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-4">
      <Skeleton className="h-10 w-48" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {["s1", "s2", "s3", "s4", "s5", "s6"].map((k) => (
          <Skeleton key={k} className="h-48 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

// Root route with Layout wrapper
const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Suspense fallback={<PageSkeleton />}>
        <Outlet />
      </Suspense>
    </Layout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const linksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/links",
  component: LinksPage,
});

const linksCategoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/links/$category",
  component: LinksPage,
});

const songsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/songs",
  component: SongsPage,
});

const fanFictionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/fanfiction",
  component: FanFictionPage,
});

const feedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/feed",
  component: FeedPage,
});

const postDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/feed/$postId",
  component: PostDetailPage,
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile/$principal",
  component: ProfilePage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});

const watchlistRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/watchlist",
  component: WatchlistPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  linksRoute,
  linksCategoryRoute,
  songsRoute,
  fanFictionRoute,
  feedRoute,
  postDetailRoute,
  profileRoute,
  adminRoute,
  watchlistRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
