import { Helmet } from 'react-helmet-async';

import { VariationView } from 'src/sections/Variation/view/';

export default function VariationPage() {
  return (
    <>
      <Helmet>
        <title> Variation </title>
      </Helmet>

      <VariationView />
    </>
  );
}
