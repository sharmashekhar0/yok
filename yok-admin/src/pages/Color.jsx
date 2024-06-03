import { Helmet } from 'react-helmet-async';

import { ColorView } from 'src/sections/Color/view';

export default function ColorPage() {
  return (
    <>
      <Helmet>
        <title> Color </title>
      </Helmet>

      <ColorView />
    </>
  );
}
