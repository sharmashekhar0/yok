import { Helmet } from 'react-helmet-async';

import RefundPolicy from 'src/sections/RefundPolicy/RefundPolicy';

// ----------------------------------------------------------------------

export default function AppPage() {
  return (
    <>
      <Helmet>
        <title> YOK </title>
      </Helmet>

      <RefundPolicy />
    </>
  );
}
