const publicVapidKey = 'BJn_8LIDN7K7XzP5G3WlM7qZ8k1n-v7y5zG2I1h9L0m3_m7Q9a-X0A';

async function subscribeAndSetAlert(min, max) {
  // 1. Browser se permission maango
  const register = await navigator.serviceWorker.register('/sw.js');
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: publicVapidKey
  });

  // 2. Device ko server se jodo
  await fetch('https://your-app-name.onrender.com/subscribe', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: { 'content-type': 'application/json' }
  });

  // 3. Range bhejo
  await fetch('https://your-app-name.onrender.com/set-range', {
    method: 'POST',
    body: JSON.stringify({ min, max }),
    headers: { 'content-type': 'application/json' }
  });
  
  alert("Alert Active! Ab aap laptop band kar sakte hain.");
}