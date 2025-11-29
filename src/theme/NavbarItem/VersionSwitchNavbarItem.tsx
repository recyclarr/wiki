import React from 'react';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

interface VersionSwitchNavbarItemProps {
  readonly mobile?: boolean;
}

export default function VersionSwitchNavbarItem({
  mobile,
}: VersionSwitchNavbarItemProps): JSX.Element {
  const location = useLocation();
  const { siteConfig } = useDocusaurusContext();
  const { otherUrl, otherVersionTitle } = siteConfig.customFields as {
    otherUrl: string;
    otherVersionTitle: string;
  };

  const href = `${otherUrl}${location.pathname}`;

  // Use appropriate class names for desktop vs mobile navbar
  const className = mobile
    ? 'menu__link'
    : 'navbar__item navbar__link';

  return (
    <a
      href={href}
      className={className}
      rel="noopener noreferrer"
    >
      {otherVersionTitle} Version
    </a>
  );
}
