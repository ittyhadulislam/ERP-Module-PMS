import { button_permissions, menu_permissions } from "../../../apiRoutes";
import { apiSlice } from "../../api/apiSlice";

export const permissionApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    menuPermission: builder.mutation({
      query: (data) => ({
        url: menu_permissions,
        method: "POST",
        body: data,
      }),
    }),
    buttonPermission: builder.mutation({
      query: (data) => ({
        url: button_permissions,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useMenuPermissionMutation, useButtonPermissionMutation } =
  permissionApi;
