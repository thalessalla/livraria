import React, { useEffect, useState } from 'react'
import axios, { AxiosError } from 'axios'

const BookListComponent: React.FC = () => {
  const [books, setBooks] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        let allBooks: any[] = []
        let startIndex = 0
        const maxResults = 5 // Define o número máximo de resultados por solicitação
        let totalItems = 0 // Inicialize com zero para começar a busca

        // Continue buscando até que todos os itens sejam recuperados ou até atingir o limite
        while (
          startIndex < maxResults &&
          (totalItems === 0 || startIndex < totalItems)
        ) {
          const response = await axios.get(
            'https://www.googleapis.com/books/v1/volumes',
            {
              params: {
                q: 'react', // Se quiser buscar por outro termo, substitua aqui
                startIndex: startIndex,
                maxResults: maxResults,
              },
            }
          )

          // Atualize o total de itens
          totalItems = response.data.totalItems

          // Adicione os livros recuperados à lista
          allBooks = allBooks.concat(response.data.items)

          // Atualize o índice de início para a próxima solicitação
          startIndex += maxResults
        }

        setBooks(allBooks)
        setLoading(false)
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(
            'Erro ao carregar os livros: ' + (error as AxiosError).message
          )
        } else {
          setError(
            'Erro ao carregar os livros: ' + (error as AxiosError).toString()
          )
        }
        setLoading(false)
      }
    }

    fetchBooks()
  }, [])

  if (loading) {
    return <div>Carregando...</div>
  }

  if (error) {
    return <div>Ocorreu um erro: {error}</div>
  }

  return (
    <div>
      <h1>Livraria Online</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <h2>{book.volumeInfo.title}</h2>
            <p>
              {book.volumeInfo.authors && book.volumeInfo.authors.join(', ')}
            </p>
            <img src={book.volumeInfo.imageLinks.smallThumbnail} alt="" />
            {book.saleInfo?.listPrice && (
              <p key={book.saleInfo.listPrice.amount}>
                {'R$ ' + book.saleInfo.listPrice.amount}
              </p>
            )}
            
          </li>
        ))}
      </ul>
    </div>
  )
}


export default BookListComponent
