import React from 'react';
import { Icon } from '@iconify/react';
import styles from './styles.module.css';

const legendItems = [
  { icon: 'mdi:check-bold', color: '#22c55e', label: 'Full Compatibility' },
  { icon: 'mdi:tilde', color: '#eab308', label: 'Partial Compatibility' },
  { icon: 'mdi:close-thick', color: '#ef4444', label: 'No Compatibility' },
];

export default function SupportLegend() {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.centered}>Icon</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {legendItems.map(({ icon, color, label }) => (
          <tr key={label}>
            <td className={styles.centered}>
              <Icon icon={icon} height={24} color={color} aria-label={label} />
            </td>
            <td>{label}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
