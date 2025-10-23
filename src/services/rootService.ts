import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";
const baseUrl = import.meta.env.VITE_API_BASE_URL as string;

/**
 * A custom baseQuery wrapper that integrates toast notifications globally.
 * It intercepts both success and error responses from the backend.
 */
const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithToast: typeof baseQuery = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  const suppressToast = (extraOptions as any)?.suppressToast; 

  if (!suppressToast) {
    if (result?.data && typeof result.data === "object" && "message" in result.data) {
      const message = (result.data as any).message;
      const success = (result.data as any).success;
      if (success) {
        toast.success(message || "Operation successful");
      } else {
        toast.error(message || "Operation failed");
      }
    }

    if (result?.error) {
      const errorMessage =
        (result.error.data as any)?.message ||
        "Something went wrong. Please try again.";
      toast.error(errorMessage);
    }
  }

  return result;
};


const rootApi = createApi({
  reducerPath: "rootApi",
  baseQuery: baseQueryWithToast,
  tagTypes: ["User", "Admin", "Question", "Answer"],
  endpoints: () => ({}),
});

export default rootApi;