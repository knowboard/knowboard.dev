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
          label: "Guides",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Intro", slug: "guides/intro" },
            { label: "Installation", slug: "guides/install" },
            { label: "Books example", slug: "guides/books" },
            { label: "Querying", slug: "guides/querying" },
            { label: "Data Shapes", slug: "guides/shapes" },
          ],
        },
        // {
        //   label: "Reference",
        //   autogenerate: { directory: "reference" },
        // },
      ],
    }),
  ],
});
