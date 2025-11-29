import React from 'react';
import Content from '@theme-original/DocItem/Content';
import type ContentType from '@theme/DocItem/Content';
import type { WrapperProps } from '@docusaurus/types';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

type Props = WrapperProps<typeof ContentType>;

function CurrentVersionLink(): JSX.Element {
  const location = useLocation();
  const { siteConfig } = useDocusaurusContext();
  const { otherUrl } = siteConfig.customFields as { otherUrl: string };
  const href = `${otherUrl}${location.pathname}`;

  return <b><a href={href}>Current Version</a></b>;
}

function NextBanner(): JSX.Element | null {
  const { siteConfig } = useDocusaurusContext();

  if (siteConfig.customFields?.isNext) {
    return (
      <div className="alert alert--warning margin-bottom--md">
        <p>The documentation here is for an <b>unreleased</b> version of Recyclarr.</p>
        Visit the documentation site for the <CurrentVersionLink /> instead.
      </div>
    );
  }

  return null;
}

export default function ContentWrapper(props: Props): JSX.Element {
  return (
    <>
      <NextBanner />
      <Content {...props} />
    </>
  );
}
