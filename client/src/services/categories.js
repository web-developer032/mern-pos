import baseApi from ".";

const categoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allCategories: builder.query({
      query: () => "/categories/get-all",
    }),

    addCategory: builder.mutation({
      query: (body) => ({ url: "/categories/add-category", method: "POST", body }),
    }),
  }),
  overrideExisting: false,
});

export const { useAllCategoriesQuery, useAddCategoryMutation } = categoriesApi;
