import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layout.tsx", [
    index("routes/home.tsx"),
    route("calendar", "routes/calendar/route.tsx"),
    route("people", "routes/people/route.tsx", [
      route("new", "routes/people/new/route.tsx"),
      route(":personId/edit", "routes/people/edit/route.tsx"),
      route(":personId/delete", "routes/people/delete/route.tsx"),
    ]),
    route("teams", "routes/teams/route.tsx"),
  ]),
  route("kinde-auth/company", "routes/auth/company/route.tsx"),
  route("kinde-auth/*", "routes/auth/index.tsx"),
] satisfies RouteConfig;
