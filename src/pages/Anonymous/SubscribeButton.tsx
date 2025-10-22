import { useAddSubscriptionMutation } from "../../services/notificationService";


const SubscribeButton = () => {
  const [addSubscription, { isLoading }] = useAddSubscriptionMutation();
  const handleSubscribe = async () => {
    const registration = await navigator.serviceWorker.ready;
    
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      return alert("Please enable notifications to subscribe");
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
  };



  return (
    <button
      onClick={handleSubscribe}
      disabled={isLoading}
    >
      {isLoading ? "Subscribing..." : "Subscribe to Notifications"}
    </button>
  );
};

export default SubscribeButton;
