/* eslint-disable */
import React, { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import phonePayLogo from '../../../src/images/PhonePe-Logo.wine.png';
import rogerpayLogo from '../../../src/images/Razorpay_logo.svg';
import './PaymentSetting.css';
import Switch from '@mui/material/Switch';
import { getPaymentGatewayKeys, createUpdateKeys } from 'src/api/api';
import Swal from 'sweetalert2';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export default function PaymentSetting() {
  const [razorpay, setRazorpay] = useState(false);
  const [phonePay, setPhonePay] = useState(false);
  const [razorpaySecret, setRazorpaySecret] = useState('');
  const [razorpayKey, setRazorpayKey] = useState('');
  const [phonePeSecret, setPhonePeSecret] = useState('');
  const [phonePeMerchantId, setPhonePeMerchantId] = useState('');

  useEffect(() => {
    // Fetch payment gateway keys when component mounts
    fetchPaymentGatewayKeys();
  }, []);

  const fetchPaymentGatewayKeys = async () => {
    try {
      // Call the API to get payment gateway keys
      const response = await getPaymentGatewayKeys();
      console.log('Payment Gateway Keys:', response);

      // Map the response data to state variables
      if (response.data && response.data.keys) {
        const { razorpay, phonepe, activeGateway } = response.data.keys;
        if (razorpay) {
          setRazorpayKey(razorpay.key);
          setRazorpaySecret(razorpay.secret);
        }
        if (phonepe) {
          setPhonePeMerchantId(phonepe.merchantId);
          setPhonePeSecret(phonepe.secret);
        }
        if (activeGateway === 'razorpay') {
          setRazorpay(true);
        } else if (activeGateway === 'phonepe') {
          setPhonePay(true);
        }
      }
    } catch (error) {
      console.error('Error fetching payment gateway keys:', error);
    }
  };

  const handleCreatePaymentKeys = async () => {
    try {
      // Prepare request body based on the selected gateways
      const requestBody = {};
      if (razorpay) {
        requestBody.razorpay = {
          key: razorpayKey,
          secret: razorpaySecret,
        };
      }
      if (phonePay) {
        requestBody.phonepe = {
          merchantId: phonePeMerchantId,
          secret: phonePeSecret,
        };
      }

      requestBody.activeGateway = razorpay ? 'razorpay' : phonePay ? 'phonepe' : null;

      console.log('requestBody', requestBody);

      // Call your API endpoint to store the payment keys
      const response = await createUpdateKeys(requestBody);

      console.log('Response from API:', response.data);

      if (response.data.success) {
        // Show success popup
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: response.data.message,
          timer: 2000,
        });
      } else {
        // Show failure popup
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.data.message,
          timer: 2000,
        });
      }
    } catch (error) {
      console.error('Error creating payment keys:', error);
    }
  };

  const handleChange = (e, name) => {
    let value = e.target.value;
    if (name === 'RazorpaySecret') {
      setRazorpaySecret(value);
    } else if (name === 'RazorpayKey') {
      setRazorpayKey(value);
    } else if (name === 'PhonePeSecret') {
      setPhonePeSecret(value);
    } else if (name === 'PhonePeMerchantId') {
      setPhonePeMerchantId(value);
    }
  };

  // Toggle Razorpay state
  const handleRazorpayClick = () => {
    setRazorpay(!razorpay);
  };

  // Toggle PhonePe state
  const handlePhonePayClick = () => {
    setPhonePay(!phonePay);
  };

  return (
    <Container>
      <div>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4">Payment Setting</Typography>
        </Stack>
        <Typography variant="h5" style={{ color: 'red' }}>
          Note: Activate any one payment gateway. Do not activate both together
        </Typography>
        <div className="payment-options-yok">
          <div className="payment-option-single-yok">
            <img
              width={'260px'}
              className="payment-option-image-yok"
              src={rogerpayLogo}
              alt="Razorpay"
            />
            <div className="payment-option-toggle-btn-yok">
              <Switch onChange={handleRazorpayClick} {...label} checked={razorpay} />
            </div>
          </div>
          <div className="payment-option-single-yok">
            <img
              width={'260px'}
              className="payment-option-image-yok"
              src={phonePayLogo}
              alt="PhonePe"
            />
            <div className="payment-option-toggle-btn-yok">
              <Switch onChange={handlePhonePayClick} {...label} checked={phonePay} />
            </div>
          </div>
        </div>
        <div className="create-product-details-product-name-image-ds">
          <div>
            {razorpay && (
              <div
                style={{
                  marginBottom: '20px',
                }}
              >
                <TextField
                  className="create-product-input-box-two-yokk"
                  style={{ height: '60px', marginBottom: '10px' }}
                  id="outlined-basic"
                  label="Razorpay Key"
                  variant="outlined"
                  name="RazorpayKey"
                  value={razorpayKey}
                  onChange={(e) => handleChange(e, 'RazorpayKey')}
                />
                <TextField
                  style={{ height: '60px' }}
                  className="payment-input-box"
                  label="Razorpay Secret"
                  name="RazorpaySecret"
                  value={razorpaySecret}
                  onChange={(e) => handleChange(e, 'RazorpaySecret')}
                />
              </div>
            )}
            {phonePay && (
              <div>
                <TextField
                  className="create-product-input-box-two-yokk"
                  style={{ height: '60px', marginBottom: '10px' }}
                  id="outlined-basic"
                  label="PhonePe Merchant ID"
                  variant="outlined"
                  name="PhonePeMerchantId"
                  value={phonePeMerchantId}
                  onChange={(e) => handleChange(e, 'PhonePeMerchantId')}
                />
                <TextField
                  style={{ height: '60px' }}
                  className="payment-input-box"
                  label="PhonePe Secret"
                  name="PhonePeSecret"
                  value={phonePeSecret}
                  onChange={(e) => handleChange(e, 'PhonePeSecret')}
                />
              </div>
            )}
          </div>
          <div className="create-product-button-yok">
            <Button
              onClick={handleCreatePaymentKeys}
              variant="contained"
              color="inherit"
              style={{ marginTop: '15px' }}
              // Disable the button if no gateway is selected or both are selected
              disabled={(!razorpay && !phonePay) || (razorpay && phonePay)}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
