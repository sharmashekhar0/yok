/* eslint-disable */

import { Helmet } from 'react-helmet-async';

import Banner from 'src/sections/Banner/Banner';

// ----------------------------------------------------------------------

export default function BannerPage() {
  return (
    <>
      <Helmet>
        <title> YOK </title>
      </Helmet>

      <Banner />
    </>
  );
}