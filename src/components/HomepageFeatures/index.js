import React from 'react';
import { Icon } from '@iconify/react';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Automatic TRaSH Sync',
    icon: 'mdi:sync',
    description: 'Continuously synchronize custom formats, quality profiles, and naming schemes from TRaSH Guides',
  },
  {
    title: 'Multi-Instance Management',
    icon: 'mdi:server-network',
    description: 'Configure and manage multiple Sonarr and Radarr instances from a single YAML file',
  },
  {
    title: 'Template Library',
    icon: 'mdi:file-code',
    description: '17+ pre-built configuration templates for common Sonarr and Radarr setups',
  },
  {
    title: 'Cross-Platform Support',
    icon: 'mdi:devices',
    description: 'Run anywhere with Docker, native binaries for Windows, macOS, Linux, and Unraid',
  },
];

function Feature({icon, title, description}) {
  return (
    <div className={styles.featureCard}>
      <Icon icon={icon} className={styles.featureIcon} />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className={styles.container}>
        <h2 className={styles.featuresTitle}>Key Features</h2>
        <div className={styles.featureGrid}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
