import React from 'react';
import Layout from '@theme/Layout';
import Hero from '@site/src/components/Hero';
import QuickStart from '@site/src/components/QuickStart';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

export default function Home() {
  return (
    <Layout
      title="Home"
      description="Automatically synchronize TRaSH Guides to Sonarr and Radarr"
      wrapperClassName="homepage">
      <Hero />
      <QuickStart />
      <HomepageFeatures />
    </Layout>
  );
}
