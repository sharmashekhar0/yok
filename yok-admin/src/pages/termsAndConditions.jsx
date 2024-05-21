import { Helmet } from 'react-helmet-async';

import TermsAndConditions from 'src/sections/termsAndConditions/termsAndConditions';

// ----------------------------------------------------------------------

export default function AppPage() {
  return (
    <>
      <Helmet>
        <title> YOK </title>
      </Helmet>

      <TermsAndConditions />
    </>
  );
}
