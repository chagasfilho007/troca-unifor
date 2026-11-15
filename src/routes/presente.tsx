import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/presente")({
  beforeLoad: () => {
    throw redirect({ to: "/presentes" });
  },
});
