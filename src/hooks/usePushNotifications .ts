// import { useEffect } from "react";

// export const usePushNotifications = () => {
//   useEffect(() => {
//     const init = async () => {
//       if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
//         console.warn("Push notifications not supported");
//         return;
//       }

//       const reg = await navigator.serviceWorker.register("/sw.js");
//       console.log("Service worker registered:", reg);

//       const permission = await Notification.requestPermission();
//       if (permission !== "granted") {
//         console.warn("Notifications permission denied");
//         return;
//       }

//       const vapidPublicKey = import.meta.env.VITE_VAPID_PUBLIC_KEY;
//       const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

//       const subscription = await reg.pushManager.subscribe({
//         userVisibleOnly: true,
//         applicationServerKey: convertedVapidKey,
//       });

//       // Send subscription to backend
//       await fetch(`${import.meta.env.VITE_API_BASE_URL}/notifications/subscribe`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: JSON.stringify(subscription),
//       });
//     };

//     init();
//   }, []);
// };

// function urlBase64ToUint8Array(base64String: string) {
//   const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
//   const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
//   const rawData = window.atob(base64);
//   return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
// }
