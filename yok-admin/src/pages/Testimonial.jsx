import { Helmet } from 'react-helmet-async';

import { TestimonialView } from 'src/sections/Testimonial/view/';

export default function TestimonialPage() {
  return (
    <>
      <Helmet>
        <title> Testimonial </title>
      </Helmet>

      <TestimonialView />
    </>
  );
}
