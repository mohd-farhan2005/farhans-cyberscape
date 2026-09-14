import { createFileRoute } from "@tanstack/react-router";
import { Portfolio } from "@/components/portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Muhammad Farhan | Full Stack Web Developer" },
      { name: "description", content: "Portfolio of Muhammad Farhan, a Full Stack Web Developer specializing in Laravel, WordPress, PHP, and modern responsive experiences." },
      { property: "og:title", content: "Muhammad Farhan | Full Stack Developer" },
      { property: "og:description", content: "Laravel, WordPress, and responsive web experiences built with clean code and creative design." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});