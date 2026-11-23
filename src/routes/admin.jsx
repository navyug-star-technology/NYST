import { createFileRoute } from "@tanstack/react-router";
import AdminApp from "../../admin/AdminApp.jsx";

export const Route = createFileRoute("/admin")({
  component: AdminApp,
  head: () => ({
    meta: [
      { title: "Admin | NavYug Star Technology" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});
