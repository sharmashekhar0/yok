import { Helmet } from 'react-helmet-async';

import RefundPolicy from 'src/sections/RefundPolicy/RefundPolicy';

// ----------------------------------------------------------------------

export default function RefundPage() {
  return (
    <>
      <Helmet>
        <title> YOK </title>
      </Helmet>

      <RefundPolicy />
    </>
  );
}
