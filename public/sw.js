self.addEventListener("push", (event) => {
  let data = {};
  try {
    data = event.data.json();
    console.log("Push event data:", data);
  } catch {
    data = { title: "Notification", body: event.data.text() };
  }

  const options = {
    body: data.body,
    icon: data.icon || "/vite.svg",
    data: { url: data.url || "/" },
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data.url;
  event.waitUntil(clients.openWindow(url));
});
