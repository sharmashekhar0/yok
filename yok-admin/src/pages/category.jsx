import { Helmet } from 'react-helmet-async';

import CategoriesView from 'src/sections/products/category/CategoriesView';

// ----------------------------------------------------------------------

export default function Categorypage() {
  return (
    <>
      <Helmet>
        <title> YOK </title>
      </Helmet>

      <CategoriesView />
    </>
  );
}
