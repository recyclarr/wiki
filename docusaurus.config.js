// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Recyclarr',
  tagline: 'Documentation for Recyclarr',
  url: 'https://recyclarr.dev',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'recyclarr', // Usually your GitHub org/user name.
  projectName: 'recyclarr', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/wiki',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/recyclarr/wiki/tree/master/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Recyclarr',
        logo: {
          alt: 'Recyclarr Logo',
          src: 'img/recyclarr.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'wiki-main',
            position: 'left',
            label: 'Wiki',
          },
          {
            href: 'https://github.com/recyclarr/recyclarr',
            position: 'right',
            className: "header-github-link",
            "aria-label": "Github repository"
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.com/invite/Vau8dZ3',
              },
            ],
          },
          {
            title: 'Github',
            items: [
              {
                label: 'Recyclarr',
                href: 'https://github.com/recyclarr/recyclarr',
              },
              {
                label: 'Wiki',
                href: 'https://github.com/recyclarr/wiki',
              },
            ],
          },
        ],
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: []
      },
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: true,
      },
      algolia: {
        appId: '55D8QHPBTN',
        apiKey: '0473b22a41705ad31b85bdad1ee940f5',
        indexName: 'recyclarr'
      }
    }),
};

module.exports = config;
