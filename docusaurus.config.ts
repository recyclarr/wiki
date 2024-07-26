import type {Config} from '@docusaurus/types'
import { themes } from 'prism-react-renderer';
// import darkCodeTheme from 'prism-react-renderer/themes/dracula';

function currentOrNextInfo(getNext) {
  var master = {
    hostname: 'recyclarr.dev',
    versionTitle: 'Current'
  }

  var next = {
    hostname: 'next.recyclarr.dev',
    versionTitle: 'Next'
  }

  return getNext ? next : master;
}

const isNext = process.env.GITHUB_REF === 'refs/heads/next'
const currentInfo = currentOrNextInfo(isNext)
const otherInfo = currentOrNextInfo(!isNext)

const config: Config = {
  title: 'Recyclarr',
  tagline: 'Documentation for Recyclarr',
  url: `https://${currentInfo.hostname}`,
  baseUrl: '/',
  trailingSlash: true,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  customFields: {
    isNext: isNext
  },

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
      ({
        docs: {
          routeBasePath: '/wiki',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/recyclarr/wiki/tree/master/'
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themes: [
    'docusaurus-theme-github-codeblock'
  ],

  themeConfig:
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
            type: 'doc',
            docId: 'guide-configs',
            label: 'Config Templates'
          },
          {
            href: `https://${otherInfo.hostname}/wiki`,
            target: '_self',
            position: 'right',
            label: `${otherInfo.versionTitle} Version Docs`,
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
        theme: themes.github,
        darkTheme: themes.dracula,
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
      },
      codeblock: {
        showGithubLink: true,
        githubLinkLabel: 'View on GitHub',
        showRunmeLink: false,
        runmeLinkLabel: 'Checkout via Runme'
      }
    }),
};

module.exports = config;
