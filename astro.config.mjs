// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Knowboard",
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
            { label: "Querying", slug: "tutorial/querying" },
            { label: "Data Shapes", slug: "tutorial/shapes" },
          ],
        },
        {
          label: "Guides",
          items: [],
        },
        {
          label: "Reference",
          autogenerate: { directory: "reference" },
        },
      ],
    }),
  ],
});
