self.addEventListener('push', event => {
  let data;
  try {
    data = event.data ? event.data.json() : { title: 'Default Title', body: 'No payload received' };

    // Normalize keys
    const title = data.title || data.Title || 'Notification';
    const body = data.body || data.Body || 'You have a new notification';
    const icon = data.icon || '/vite.svg';

    const options = { body, icon };

    event.waitUntil(self.registration.showNotification(title, options));
  } catch (error) {
    console.error('Error parsing push data:', error);
    const options = { body: 'Failed to parse notification data' };
    event.waitUntil(self.registration.showNotification('Error', options));
  }
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(clients.openWindow('/')); // Customize URL if needed
});
