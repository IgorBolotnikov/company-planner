import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("layout.tsx", [
    index("routes/home.tsx"),
    route("people", "routes/people/index.tsx"),
  ]),
  route("kinde-auth/company", "routes/auth/company/route.tsx"),
  route("kinde-auth/*", "routes/auth/index.tsx"),
] satisfies RouteConfig;
