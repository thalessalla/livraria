import React, { useState } from 'react'
import { useSearchBooksQuery } from '../../slices/bookApiSlice'



const BookSearchComponent: React.FC = () => {
  const [query, setQuery] = useState('')
  const { data, error, isLoading } = useSearchBooksQuery(query)

  const handleSearch = () => {
    // Realiza a busca quando o usuário pressiona Enter ou clica no botão de busca
    // Você pode adicionar mais lógica de validação aqui, se necessário
    if (query.trim()) {
      // Inicia a consulta com a string de consulta atual
      // O resultado da consulta será armazenado em 'data'
      // Se ocorrer um erro, ele será armazenado em 'error'
      // 'isLoading' indica se a consulta está em andamento
      setQuery(query.trim())
    }
  }

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {isLoading && <div>Loading...</div>}

      {/* {error && (
        <div>
          Error: {error.status === 400 ? 'Bad Request' : 'An error occurred'}
        </div>
      )} */}

      {data && (
        <div>
          {data.items.map((item: any) => (
            <div key={item.id}>
              <h2>{item.volumeInfo.title}</h2>
              <p>
                {item.volumeInfo.authors && item.volumeInfo.authors.join(', ')}
              </p>
              {/* Adicione mais informações conforme necessário */}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default BookSearchComponent
