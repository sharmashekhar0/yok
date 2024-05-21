import { Helmet } from 'react-helmet-async';

import { TestimonialView } from 'src/sections/Testimonial/view/';

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> Testimonial </title>
      </Helmet>

      <TestimonialView />
    </>
  );
}
