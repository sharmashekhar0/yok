import { Helmet } from 'react-helmet-async';

import PrivacyPolicy from 'src/sections/PrivacyPolicy/PrivacyPolicy';

// ----------------------------------------------------------------------

export default function AppPage() {
  return (
    <>
      <Helmet>
        <title> YOK </title>
      </Helmet>

      <PrivacyPolicy />
    </>
  );
}
