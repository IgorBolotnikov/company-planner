import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("kinde-auth/*", "routes/auth/index.tsx"),
] satisfies RouteConfig;
