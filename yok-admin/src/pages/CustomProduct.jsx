import { Helmet } from 'react-helmet-async';

import { CustomProductView } from 'src/sections/CustomProduct/view/';

export default function CustomProductPage() {
  return (
    <>
      <Helmet>
        <title> Custom Product </title>
      </Helmet>

      <CustomProductView />
    </>
  );
}
