import { Helmet } from 'react-helmet-async';

import ReportsView from 'src/sections/products/reports/ReportsView';

// ----------------------------------------------------------------------

export default function Reportspage() {
    return (
        <>
            <Helmet>
                <title> YOK </title>
            </Helmet>

            <ReportsView />
        </>
    );
}
