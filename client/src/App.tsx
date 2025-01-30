import { load } from "@cashfreepayments/cashfree-js";
import { useState } from 'react';
import './App.css'

const createPayment = async () => {
  try {
    const response = await fetch('http://localhost:3000/payment', {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    if (!data?.payment) {
      throw new Error('Payment not found');
    }
    return data;
  } catch (error) {
    throw error;
  }
};

const verifyPayment = async (orderID: string) => {
  try {
    const response = await fetch('http://localhost:3000/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderID }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

let cashfree: { checkout: (arg0: { paymentSessionId: any; redirectTarget: string; }) => any; };
const initializeSDK = async () => {
  cashfree = await load({
    mode: "sandbox",
  });
}

function App() {
  const [loading, setLoading] = useState(false);

  initializeSDK();

  const handlePayment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await createPayment();

      await cashfree.checkout({
        paymentSessionId: data.payment.payment_session_id,
        redirectTarget: "_modal",
      });

      const verifyData = await verifyPayment(data.payment.order_id);
      if (verifyData.payment['0'].is_captured) {
        alert("Payment is successful");
      } else {
        alert("Payment is not successful");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1>Cashfree Payment Gateway</h1>
      <div className="card">
        <button onClick={handlePayment} disabled={loading}>
          Pay Now
        </button>
      </div>
    </>
  )
}

export default App
