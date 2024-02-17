import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const reqresApi = createApi({
  reducerPath: 'reqresApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://reqres.in/api/' }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: `login`,
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: ({ email, password }) => ({
        url: `register`,
        method: 'POST',
        body: { email, password },
      }),
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation } = reqresApi