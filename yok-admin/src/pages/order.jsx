import { Helmet } from 'react-helmet-async';

import OrderView from 'src/sections/order/view/orderView';


export default function Customer() {
  return (
    <>
      <Helmet>
        <title> YOK </title>
      </Helmet>

      <OrderView />
    </>
  );
}
