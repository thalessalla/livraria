import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const apiKey = 'AIzaSyBG08sU8tsfrXFTl10oU4YPgEaoKhkC20M' 

export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://www.googleapis.com/books/v1/',
  }),
  endpoints: (builder) => ({
    searchBooks: builder.query({
      query: (query: string) =>
        `volumes?q=${encodeURIComponent(query)}&key=${apiKey}`,
    }),
  }),
})

export const { useSearchBooksQuery } = booksApi
