import { Helmet } from 'react-helmet-async';

import ReviewsView from 'src/sections/products/reviews/ReviewsView';

// ----------------------------------------------------------------------

export default function ProductsPage() {
    return (
        <>
            <Helmet>
                <title> YOK </title>
            </Helmet>

            <ReviewsView />
        </>
    );
}
