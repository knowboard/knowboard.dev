// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  site: "https://www.knowboard.dev",
  integrations: [
    starlight({
      title: "Knowboard",
      logo: {
        src: "./src/assets/knowboard-blue-yellow.svg",
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/knowboard",
        },
      ],
      sidebar: [
        {
          label: "Getting Started",
          items: [
            { label: "What is Knowboard", slug: "tutorial/intro" },
            { label: "Installation", slug: "tutorial/install" },
            { label: "Books example", slug: "tutorial/books" },
            { label: "Contextualizing", slug: "tutorial/contextualizing" },
            { label: "Data Files", slug: "tutorial/data-files" },
            { label: "Querying", slug: "tutorial/querying" },
            { label: "Data Shapes", slug: "tutorial/shapes" },
          ],
        },
        {
          label: "Guides",
          items: [{ autogenerate: { directory: "guides" } }],
        },
        {
          label: "Reference",
          items: [{ autogenerate: { directory: "reference" } }],
        },
      ],
    }),
  ],
});
