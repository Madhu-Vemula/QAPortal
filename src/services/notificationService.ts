import type { ApiResponse } from "../types/ApiResponse";
import rootApi from "./rootService";

export interface PushSubscriptionKeys {
  p256dh: string;
  auth: string;
}

export interface PushSubscriptionRequest {
  endpoint: string;
  expirationTime?: string | null;
  keys: PushSubscriptionKeys;
}

export const notificationApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    addSubscription: builder.mutation<ApiResponse<string>, PushSubscriptionRequest>({
      query: (subscription: PushSubscriptionRequest) => ({
        url: "notifications/subscribe",
        method: "POST",
        body: subscription,
      }),
      invalidatesTags: ["User"],
    }),

    sendNotification: builder.mutation<ApiResponse<string>, any>({
      query: (payload) => ({
        url: "notifications/send",
        method: "POST",
        body: payload,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useAddSubscriptionMutation,
  useSendNotificationMutation,
} = notificationApi;
