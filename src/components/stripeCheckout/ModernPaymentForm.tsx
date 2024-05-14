import React, { useState, useEffect } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Zoom,
  RadioGroup,
  Radio,
  FormControlLabel,
  MenuItem,
  Select,
  InputLabel,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { green } from '@mui/material/colors';

// Mock list of banks for demonstration purposes
const banks = [
  'State Bank of India',
  'HDFC Bank',
  'ICICI Bank',
  'Axis Bank',
  'Punjab National Bank',
  'Bank of Baroda',
  'Kotak Mahindra Bank',
  'Canara Bank',
  'Union Bank of India',
  'Bank of India',
];

const ModernPaymentForm = ({ onPaymentSuccess, onClose, price }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [cardholderName, setCardholderName] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessageTimeout, setSuccessMessageTimeout] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [selectedBank, setSelectedBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessingPayment(true);

    if (paymentMethod === 'card') {
      const cardElement = elements.getElement(CardElement);

      if (!cardElement) {
        return;
      }

      const { error, paymentMethod: stripePaymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: cardholderName,
        },
      });

      if (error) {
        console.error('Error creating payment method:', error);
        setIsProcessingPayment(false);
      } else {
        console.log('Payment method created:', stripePaymentMethod);
        showSuccessMessageWithDelay(); // Show success message after delay
        setIsProcessingPayment(false);
      }
    } else if (paymentMethod === 'upi') {
      // UPI payment logic
      console.log('UPI payment initiated');
      showSuccessMessageWithDelay(); // Show success message after delay
      setIsProcessingPayment(false);
    } else if (paymentMethod === 'netbanking') {
      // Net banking payment logic
      console.log('Net banking payment initiated');
      console.log('Selected Bank:', selectedBank);
      console.log('Account Number:', accountNumber);
      console.log('IFSC Code:', ifscCode);
      showSuccessMessageWithDelay(); // Show success message after delay
      setIsProcessingPayment(false);
    }
  };

  const showSuccessMessageWithDelay = () => {
    const timeout = setTimeout(() => {
      setShowSuccessMessage(true);

      // Close the modal and show the toast notification after the delay
      setTimeout(() => {
        onClose(); // Close the modal
        onPaymentSuccess();
      }, 3000); // Adjust the delay as needed (set to 3 seconds here)
    }, 3000); // Show the success message after 3 seconds

    setSuccessMessageTimeout(timeout);
  };

  useEffect(() => {
    return () => {
      clearTimeout(successMessageTimeout);
    };
  }, [successMessageTimeout]);

  return (
    <>
      {!showSuccessMessage ? (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: { xs: '100%', md: 400 } }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', marginBottom: 2 }}>
            Payment Details
          </Typography>
  
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <RadioGroup
                aria-label="Payment Method"
                name="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel value="card" control={<Radio />} label="Credit/Debit Card" />
                <FormControlLabel value="upi" control={<Radio />} label="UPI" />
                <FormControlLabel value="netbanking" control={<Radio />} label="Net Banking" />
              </RadioGroup>
            </Grid>
  
            {paymentMethod === 'card' && (
              <>
                <Grid item xs={12}>
                  <TextField
                    required
                    label="Cardholder Name"
                    value={cardholderName}
                    onChange={(e) => setCardholderName(e.target.value)}
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
  
                <Grid item xs={12}>
                  <CardElement
                    options={{
                      style: {
                        base: {
                          fontSize: '16px',
                          color: '#424770',
                          '::placeholder': {
                            color: '#aab7c4',
                          },
                        },
                        invalid: {
                          color: '#9e2146',
                        },
                      },
                    }}
                  />
                </Grid>
              </>
            )}
  
            {paymentMethod === 'upi' && (
              <Grid item xs={12}>
                {/* UPI payment form fields */}
                <TextField
                  required
                  label="UPI ID"
                  fullWidth
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            )}
  
            {paymentMethod === 'netbanking' && (
              <>
                <Grid item xs={12}>
                  <InputLabel id="bank-label" required>
                    Bank
                  </InputLabel>
                  <Select
                    required
                    labelId="bank-label"
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    fullWidth
                  >
                    {banks.map((bank) => (
                      <MenuItem key={bank} value={bank}>
                        {bank}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
  
                <Grid item xs={12}>
                  <TextField
                    required
                    label="Account Number"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
  
                <Grid item xs={12}>
                  <TextField
                    required
                    label="IFSC Code"
                    value={ifscCode}
                    onChange={(e) => setIfscCode(e.target.value)}
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </>
            )}
  
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isProcessingPayment}
                fullWidth
                sx={{
                  fontWeight: 'bold',
                  padding: '12px 24px',
                  borderRadius: '30px',
                }}
              >
                {isProcessingPayment ? 'Processing...' : `Pay ${price} INR`}
              </Button>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <CheckCircleOutlineIcon sx={{ color: green[500], fontSize: 60 }} />
          <Typography variant="h5" sx={{ color: green[500], fontWeight: 'bold', marginTop: 2 }}>
            Payment Successful!
          </Typography>
        </Box>
      )}
    </>
  );
};
export default ModernPaymentForm;