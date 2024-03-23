import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseApi = createApi({
  reducerPath: "baseApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_SERVER_URL}/api`,

    // prepareHeaders: (headers, { getState }) => {
    //     const stateToken = getState().auth.token;

    //     const token = localStorage.getItem("authToken");

    //     // If we have a token set in state, let's assume that we should be passing it.
    //     headers.set("x-auth-token", stateToken || token || "");

    //     return headers;
    // },
  }),

  // tagTypes: ["CONNECTED-USERS", "MAPS", "SHARED-MAPS", "GROUPS", "MOVE-PIN"],

  endpoints: () => ({}),
});

export default baseApi;
