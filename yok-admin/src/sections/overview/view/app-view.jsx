/* eslint-disable */
import { faker } from '@faker-js/faker';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import AppWidgetSummary from '../app-widget-summary';
import AppConversionRates from '../app-conversion-rates';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import DoneAllIcon from '@mui/icons-material/DoneAll';


// ----------------------------------------------------------------------

export default function AppView() {
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Total Sales"
            total={714000}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Customers"
            total={1352831}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Total Orders"
            total={1723315}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Total Products"
            total={234}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>
        
        <Grid xs={12} md={6} lg={3}>
          <AppWidgetSummary
            className='yok-orders-yok'
            title="Order Placed"
            total={714000}
            color="success"
          />
           <AppWidgetSummary
            className='yok-orders-yok'
            mt={1.889}
            title="Confirmed Order"
            total={714000}
            color="success"
          />
          <AppWidgetSummary
            className='yok-orders-yok'
            mt={1.889}
            title="Processed Order"
            total={714000}
            color="success"
          />
          <AppWidgetSummary
            className='yok-orders-yok'
            // icon={<LocalShippingIcon style={{width: '20px !important'}} className='images-yok' fontSize="large" />}
            mt={1.889}
            title="Order Delivered"
            total={714000}
            color="success"
          />
        </Grid>
        
        <Grid xs={12} md={6} lg={9}>
          <AppConversionRates
            title="Product Sales"
            subheader="(+20%) than last month"
            chart={{
              series: [
                { label: 'Product A', value: 150 },
                { label: 'Product B', value: 200 },
                { label: 'Product C', value: 250 },
                { label: 'Product D', value: 480 },
                { label: 'Product E', value: 130 },
                { label: 'Product F', value: 400 },
                { label: 'Product G', value: 350 },
                { label: 'Product H', value: 500 },
                { label: 'Product I', value: 600 },
                { label: 'Product J', value: 700 },
              ],
            }}
          />
        </Grid>


        {/* <Grid xs={12} md={6} lg={8}>
          <AppTasks
            title="Tasks"
            list={[
              { id: '1', name: 'Create FireStone Logo' },
              { id: '2', name: 'Add SCSS and JS files if required' },
              { id: '3', name: 'Stakeholder Meeting' },
              { id: '4', name: 'Scoping & Estimations' },
              { id: '5', name: 'Sprint Showcase' },
            ]}
          />
        </Grid> */}
      </Grid>
    </Container>
  );
}
