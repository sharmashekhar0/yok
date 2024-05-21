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
import axios from 'axios';
import { getPaymentGatewayKeys, createUpdateKeys } from 'src/api/api';
import Swal from 'sweetalert2';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export default function PaymentSetting() {
  const [razorpay, setRazorpay] = useState(true);
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
          setPhonePay(false);

        } else if (activeGateway === 'phonepe') {
          setPhonePay(true);
          setRazorpay(false);

        }
      }
    } catch (error) {
      console.error('Error fetching payment gateway keys:', error);
    }
  };

  const handleCreatePaymentKeys = async () => {
    try {
      let requestBody = {};
      if (razorpay) {
        requestBody = {
          key: razorpayKey,
          secret: razorpaySecret,
          activeGateway: 'razorpay',
        };
      } else if (phonePay) {
        requestBody = {
          merchantId: phonePeMerchantId,
          secret: phonePeSecret,
          activeGateway: 'phonepe',
        };
      }

      console.log('requestBody', requestBody);

      // Call your API endpoint to store the payment keys
      const response = await createUpdateKeys(requestBody)

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

  const handlePhonePayClick = () => {
    setPhonePay(!phonePay);
    setRazorpay(!razorpay);
  };

  const handleRazorpayClick = () => {
    setRazorpay(!razorpay);
    setPhonePay(!phonePay);
  };

  return (
    <Container>
      <div>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4">Payment Setting</Typography>
        </Stack>
        <div className="payment-options-yok">
          <div className="payment-option-single-yok">
            <img width={'260px'} className="payment-option-image-yok" src={rogerpayLogo} />
            <div className="payment-option-toggle-btn-yok">
              <Switch onChange={handlePhonePayClick} {...label} checked={razorpay} />
            </div>
          </div>
          <div className="payment-option-single-yok">
            <img width={'260px'} className="payment-option-image-yok" src={phonePayLogo} />
            <div className="payment-option-toggle-btn-yok">
              <Switch onChange={handleRazorpayClick} {...label} checked={phonePay} />
            </div>
          </div>
        </div>
        <div className="create-product-details-product-name-image-ds">
          <div>
            {razorpay && (
              <>
                <TextField
                  className="create-product-input-box-two-yokk"
                  style={{ height: '60px' }}
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
              </>
            )}
            {phonePay && (
              <>
                <TextField
                  className="create-product-input-box-two-yokk"
                  style={{ height: '60px' }}
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
              </>
            )}
          </div>
          <div className="create-product-button-yok">
            <Button
              onClick={handleCreatePaymentKeys}
              variant="contained"
              color="inherit"
              style={{ marginTop: '15px' }}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
