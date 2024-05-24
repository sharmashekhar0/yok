import { Helmet } from 'react-helmet-async';

import { CustomProductRequestsView } from 'src/sections/CustomProductRequests/view';

export default function CustomProductPage() {
  return (
    <>
      <Helmet>
        <title> Custom Product Requests </title>
      </Helmet>

      <CustomProductRequestsView />
    </>
  );
}
