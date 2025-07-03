import React from 'react';
import { Button } from './ui/button';

const RazorpayButton = ({ amount, onSuccess, onError }) => {
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const scriptLoaded = await loadRazorpayScript();
    
    if (!scriptLoaded) {
      alert('Razorpay SDK failed to load');
      return;
    }

    try {
      // Create order
      const response = await fetch('http://localhost:5000/api/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      });

      const order = await response.json();

      const options = {
        key: 'rzp_test_1DP5mmOlF5G5ag',
        amount: order.amount,
        currency: order.currency,
        name: 'Negi Cake House',
        description: 'Payment for your order',
        order_id: order.id,
        handler: async (response) => {
          try {
            // Verify payment
            const verifyResponse = await fetch('http://localhost:5000/api/payment/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyResult = await verifyResponse.json();
            
            if (verifyResult.success) {
              alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
              onSuccess?.(response);
            } else {
              alert('Payment verification failed');
              onError?.('Verification failed');
            }
          } catch (error) {
            alert('Payment verification error');
            onError?.(error);
          }
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#f97316',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      alert('Payment failed');
      onError?.(error);
    }
  };

  return (
    <Button 
      onClick={handlePayment}
      className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
    >
      Pay ₹{amount}
    </Button>
  );
};

export default RazorpayButton;