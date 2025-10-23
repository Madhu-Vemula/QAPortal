import { useAddSubscriptionMutation } from "../services/notificationService";


const useSubscribeToNotification = () => {
  const [addSubscription] = useAddSubscriptionMutation();

  const subscribeToNotification = async () => {
    const registration = await navigator.serviceWorker.ready;

    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      alert("Please enable notifications to subscribe");
      return;
    }

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: import.meta.env.VITE_VAPID_PUBLIC_KEY,
    });

    const subJson = subscription.toJSON();
    const pushSubscription = {
      endpoint: subJson.endpoint || "",
      expirationTime: subJson.expirationTime
        ? subJson.expirationTime.toString()
        : null,
      keys: {
        p256dh: subJson.keys?.p256dh || "",
        auth: subJson.keys?.auth || "",
      },
    };

    await addSubscription(pushSubscription);
    console.log("Subscription saved successfully!");
  };

  return subscribeToNotification;
};

export default useSubscribeToNotification;
