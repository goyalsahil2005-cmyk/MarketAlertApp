// सादी JavaScript (No React, No Errors)
let price = 0;
let lastFundingSide = null;
let targetPrice = "";

async function fetchData() {
    try {
        const res = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT');
        const data = await res.json();
        const currentPrice = parseFloat(data.price).toFixed(2);
        
        // स्क्रीन पर डेटा दिखाना
        document.getElementById('btc-price').innerText = `$${currentPrice}`;
        
        // अलर्ट लॉजिक
        const inputTarget = document.getElementById('target-input').value;
        if (inputTarget && parseFloat(currentPrice) >= parseFloat(inputTarget)) {
            sendNotification("Price Alert!", `Market reached ${currentPrice}`);
        }
        
    } catch (err) {
        console.error("Data fetch error", err);
    }
}

function sendNotification(title, body) {
    if (Notification.permission === "granted") {
        new Notification(title, { body });
    }
}

function requestPermission() {
    Notification.requestPermission();
}

// हर 5 सेकंड में डेटा अपडेट करें
setInterval(fetchData, 5000);
fetchData(); // पहली बार तुरंत चलाने के लिए
