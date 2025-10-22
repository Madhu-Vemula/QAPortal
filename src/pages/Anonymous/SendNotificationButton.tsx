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
      className="px-4 py-2 bg-green-600 text-white rounded"
    >
      {isLoading ? "Sending..." : "Send Notification"}
    </button>
  );
};

export default SendNotificationButton;
