import { Helmet } from 'react-helmet-async';

import DiscountCouponsView from 'src/sections/DiscountCoupons/view/DiscountCouponsView';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  return (
    <>
      <Helmet>
        <title> YOK </title>
      </Helmet>

      <DiscountCouponsView />
    </>
  );
}
