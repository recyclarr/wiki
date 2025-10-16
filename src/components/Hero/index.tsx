import React from 'react';
import Link from '@docusaurus/Link';
import { Icon } from '@iconify/react';
import styles from './styles.module.css';

export default function Hero() {
  return (
    <header className={styles.hero}>
      <div className={styles.heroBackground} />
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          TRaSH Guides, <span className={styles.gradient}>Automated</span>
        </h1>
        <p className={styles.heroSubtitle}>
          Automatically synchronize TRaSH Guides to Sonarr and Radarr
        </p>
        <div className={styles.heroButtons}>
          <Link
            className={styles.buttonPrimary}
            to="/wiki/getting-started">
            <Icon icon="mdi:book-open-page-variant" />
            Get Started
          </Link>
          <Link
            className={styles.buttonSecondary}
            to="https://github.com/recyclarr/recyclarr">
            <Icon icon="mdi:github" />
            View on GitHub
          </Link>
        </div>
        <div className={styles.supportedServices}>
          <div className={styles.serviceItem}>
            <div className={styles.serviceLabel}>Sonarr</div>
            <img src="/img/sonarr.svg" alt="Sonarr" className={styles.serviceSvg} />
          </div>
          <div className={styles.serviceItem}>
            <div className={styles.serviceLabel}>Radarr</div>
            <img src="/img/radarr.svg" alt="Radarr" className={styles.serviceSvg} />
          </div>
        </div>
      </div>
    </header>
  );
}
