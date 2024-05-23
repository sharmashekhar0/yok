import { Helmet } from 'react-helmet-async';

import { BrandView } from 'src/sections/Brand/view/';

export default function BrandPage() {
  return (
    <>
      <Helmet>
        <title> Brand </title>
      </Helmet>

      <BrandView />
    </>
  );
}
