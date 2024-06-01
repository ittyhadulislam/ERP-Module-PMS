import { login } from "../../../apiRoutes";
import { apiSlice } from "../../api/apiSlice";
import { userLoggedIn } from "./authSlice";

export const userAuthApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const { accessToken, ...user } = result.data;
          sessionStorage.setItem(
            "auth",
            JSON.stringify({
              accessToken,
              user,
            })
          );
          // localStorage.setItem(
          //   "auth",
          //   JSON.stringify({
          //     accessToken,
          //     user,
          //   })
          // );
          dispatch(
            userLoggedIn({
              accessToken,
              user,
            })
          );
        } catch (err) {
          // do nothing
        }
      },
    }),
    userLogin: builder.mutation({
      query: (data) => ({
        url: login,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const { accessToken, ...user } = result.data.data;
          sessionStorage.setItem(
            "auth",
            JSON.stringify({
              accessToken,
              user,
            })
          );
          // localStorage.setItem(
          //   "auth",
          //   JSON.stringify({
          //     accessToken,
          //     user,
          //   })
          // );

          dispatch(
            userLoggedIn({
              accessToken,
              user,
            })
          );
        } catch (error) {}
      },
    }),
  }),
});

export const { useUserLoginMutation } = userAuthApi;
