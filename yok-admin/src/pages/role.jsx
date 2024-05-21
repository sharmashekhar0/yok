import { Helmet } from 'react-helmet-async';

import RolesView from 'src/sections/roles/view/RolesView';

// ----------------------------------------------------------------------

export default function ProductsPage() {
    return (
        <>
            <Helmet>
                <title> YOK </title>
            </Helmet>

            <RolesView />
        </>
    );
}
