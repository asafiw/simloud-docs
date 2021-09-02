const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: "Simloud documentation",
  tagline: "",
  url: "https://docs.simloud.com",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.svg",
  organizationName: "dospolov", // Usually your GitHub org/user name.
  projectName: "simloud-docs", // Usually your repo name.
  themeConfig: {
    navbar: {
      title: "Simloud documentation",
      logo: {
        alt: "Simloud documentation",
        src: "img/favicon.svg",
      },
      items: [
        {
          type: "doc",
          docId: "intro",
          position: "left",
          label: "Onboarding",
        },
        {
          href: "https://github.com/dospolov/simloud-docs",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          items: [
            {
              label: "Simloud Website",
              to: "https://simloud.com",
            },
            {
              label: "Simloud Blog",
              to: "https://simloud.com/resources",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Simloud`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl: "https://github.com/dospolov/simloud-docs/tree/main/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl: "https://github.com/dospolov/simloud-docs/tree/main/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};
