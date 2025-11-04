import { useAddSubscriptionMutation } from "../services/notificationService";


const useSubscribeToNotification = () => {
  const [addSubscription] = useAddSubscriptionMutation();

  const subscribeToNotification = async () => {
    try {
    const registration = await navigator.serviceWorker.ready;

    let permission = Notification.permission;
    if (permission === "default") {
      permission = await Notification.requestPermission();
    }

    if (permission !== "granted") {
      alert("Please subscribe to notification permission.");
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
    
      await addSubscription(pushSubscription).unwrap();
    } catch (error) { 
      console.error("Failed to subscribe to notifications:", error);
    }
  };

  return subscribeToNotification;
};

export default useSubscribeToNotification;
