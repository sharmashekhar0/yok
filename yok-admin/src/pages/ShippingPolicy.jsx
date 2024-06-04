import { Helmet } from 'react-helmet-async';

import ShippingPolicy from 'src/sections/ShippingPolicy/ShippingPolicy';

// ----------------------------------------------------------------------

export default function ShippingPage() {
  return (
    <>
      <Helmet>
        <title> YOK </title>
      </Helmet>

      <ShippingPolicy />
    </>
  );
}
