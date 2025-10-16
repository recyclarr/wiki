import React from 'react';
import Link from '@docusaurus/Link';
import { Icon } from '@iconify/react';
import { Highlight, themes } from 'prism-react-renderer';
import { useColorMode } from '@docusaurus/theme-common';
import styles from './styles.module.css';

const codeExample = `sonarr:
  web-1080p-v4:
    base_url: http://localhost:8989
    api_key: !secret SONARR_API_KEY

    include:
      # Use pre-built templates for instant setup
      - template: sonarr-quality-definition-series
      - template: sonarr-v4-quality-profile-web-1080p
      - template: sonarr-v4-custom-formats-web-1080p`;

export default function QuickStart() {
  const { colorMode } = useColorMode();
  const theme = colorMode === 'dark' ? themes.vsDark : themes.github;

  return (
    <section className={styles.quickStart}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.codeSection}>
            <div className={styles.codeHeader}>
              <div className={styles.codeDots}>
                <span className={styles.dot}></span>
                <span className={styles.dot}></span>
                <span className={styles.dot}></span>
              </div>
              <span className={styles.fileName}>recyclarr.yml</span>
            </div>
            <Highlight theme={theme} code={codeExample} language="yaml">
              {({ style, tokens, getLineProps, getTokenProps }) => (
                <pre className={styles.codeBlock} style={style}>
                  {tokens.map((line, i) => (
                    <div key={i} {...getLineProps({ line })}>
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token })} />
                      ))}
                    </div>
                  ))}
                </pre>
              )}
            </Highlight>
          </div>
          <div className={styles.textSection}>
            <h2 className={styles.title}>Simple YAML Configuration</h2>
            <p className={styles.subtitle}>
              Define your Sonarr and Radarr instances, reference pre-built templates, and let
              Recyclarr handle the synchronization automatically.
            </p>
            <Link className={styles.docsButton} to="/wiki/getting-started">
              <Icon icon="mdi:book-open-page-variant" />
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
