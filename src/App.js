import React, { useState, useEffect } from 'react';

function App() {
  const [price, setPrice] = useState(0);
  const [fundingRate, setFundingRate] = useState(0);
  const [targetPrice, setTargetPrice] = useState("");
  const [lastFundingSide, setLastFundingSide] = useState(null); // '+' or '-'

  // लाइव डेटा फेच करना (Price और Funding)
  useEffect(() => {
    const fetchData = async () => {
      try {
        // यहाँ Delta Exchange या Binance की API आएगी
        const res = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT');
        const data = await res.json();
        const currentPrice = parseFloat(data.price);
        setPrice(currentPrice);

        // डेमो फंडिंग रेट (यहाँ असली API लिंक डलेगा)
        const currentFunding = -0.0001; 
        setFundingRate(currentFunding);

        // 1. Price Alert Logic
        if (targetPrice && currentPrice >= parseFloat(targetPrice)) {
          sendNotification("Price Alert!", `Market reached ${currentPrice}`);
        }

        // 2. Funding Flip Alert Logic
        const currentSide = currentFunding >= 0 ? '+' : '-';
        if (lastFundingSide && lastFundingSide !== currentSide) {
          const msg = currentSide === '-' ? "Funding turned NEGATIVE (Buy Signal?)" : "Funding turned POSITIVE (Sell Signal?)";
          sendNotification("Funding Flip!", msg);
        }
        setLastFundingSide(currentSide);

      } catch (err) {
        console.error("Data fetch error", err);
      }
    };

    const interval = setInterval(fetchData, 5000); // हर 5 सेकंड में चेक करेगा
    return () => clearInterval(interval);
  }, [targetPrice, lastFundingSide]);

  const sendNotification = (title, body) => {
    if (Notification.permission === "granted") {
      new Notification(title, { body });
    }
  };

  const requestPermission = () => {
    Notification.requestPermission();
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'Arial' }}>
      <h1>Market & Funding Alert</h1>
      <button onClick={requestPermission}>Enable Notifications</button>
      
      <div style={{ margin: '20px', padding: '20px', border: '1px solid #ccc' }}>
        <h3>BTC Price: ${price}</h3>
        <h3 style={{ color: fundingRate < 0 ? 'red' : 'green' }}>
          Funding Rate: {fundingRate}%
        </h3>
      </div>

      <input 
        type="number" 
        placeholder="Set Target Price" 
        value={targetPrice}
        onChange={(e) => setTargetPrice(e.target.value)}
      />
      <p>Funding Flip अलर्ट अपने आप चालू है।</p>
    </div>
  );
}
