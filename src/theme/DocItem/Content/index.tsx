import React from 'react';
import Content from '@theme-original/DocItem/Content';
import type ContentType from '@theme/DocItem/Content';
import type { WrapperProps } from '@docusaurus/types';
import Link from '@docusaurus/Link';
import config from '@generated/docusaurus.config';

type Props = WrapperProps<typeof ContentType>;

function CurrentVersionLink(props) {
  return <b><Link to="https://recyclarr.dev/guide" target='_self'>Current Version</Link></b>
}

function NextBanner(): JSX.Element | null {
  if (config.customFields?.isNext) {
    return (
      <div className="alert alert--warning margin-bottom--md">
        <p>The documentation here is for an <b>unreleased</b> version of Recyclarr.</p>
        Visit the documentation site for the <CurrentVersionLink /> instead.
      </div>
    )
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
