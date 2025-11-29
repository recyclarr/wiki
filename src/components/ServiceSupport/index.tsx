import React from 'react';
import { Icon } from '@iconify/react';
import styles from './styles.module.css';

type SupportLevel = 'full' | 'partial' | 'none';

interface ServiceSupportProps {
  sonarr?: SupportLevel;
  radarr?: SupportLevel;
}

const supportConfig: Record<SupportLevel, { icon: string; color: string; label: string }> = {
  full: { icon: 'mdi:check-bold', color: '#22c55e', label: 'Full support' },
  partial: { icon: 'mdi:tilde', color: '#eab308', label: 'Partial support' },
  none: { icon: 'mdi:close-thick', color: '#ef4444', label: 'No support' },
};

function SupportIcon({ level }: { level: SupportLevel }) {
  const { icon, color, label } = supportConfig[level];
  return <Icon icon={icon} height={24} color={color} aria-label={label} />;
}

export default function ServiceSupport({
  sonarr = 'none',
  radarr = 'none',
}: ServiceSupportProps) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Service</th>
          <th className={styles.centered}>Supported</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Sonarr (v4)</td>
          <td className={styles.centered}><SupportIcon level={sonarr} /></td>
        </tr>
        <tr>
          <td>Radarr</td>
          <td className={styles.centered}><SupportIcon level={radarr} /></td>
        </tr>
      </tbody>
    </table>
  );
}
