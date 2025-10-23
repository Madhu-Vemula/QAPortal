import { useSendNotificationMutation } from "../../services/notificationService";


const SendNotificationButton = () => {
  const [sendNotification, { isLoading }] = useSendNotificationMutation();

  const handleSend = async () => {
    await sendNotification({
      title: "New Message",
      body: "You have a new question update!",
    });
  };

  return (
    <button
      onClick={handleSend}
      disabled={isLoading}
    >
      {isLoading ? "Sending..." : "Send Notification"}
    </button>
  );
};

export default SendNotificationButton;
