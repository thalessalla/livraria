import React, { useState } from 'react'
import { useSearchBooksQuery } from '../../slices/bookApiSlice'
import Search from "../../assets/search.svg"


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
      <div  className='search-books'>
      <input
        type="text"
        placeholder='Pesquisar livros'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}><img src={Search} alt="Icole de uma lupa" /></button>
      </div>

      {isLoading && <div>Carregando...</div>}


      {data && (
  <div className='container-books'>
    {data.items.map((item: any) => (
      <div className='card-book' key={item.id}>
        {item.volumeInfo.imageLinks?.smallThumbnail && (
          <img src={item.volumeInfo.imageLinks.smallThumbnail} alt={item.volumeInfo.title} />
        )}
        <h3>{item.volumeInfo.title}</h3>
        <p>
          {item.volumeInfo.authors && item.volumeInfo.authors.join(', ')}
        </p>
        
        {item.saleInfo?.listPrice && (
          <p className='price-card' key={item.saleInfo.listPrice.amount}>
            {'R$ ' + item.saleInfo.listPrice.amount}
          </p>
        )}
      </div>
    ))}
  </div>
)}
    </div>
  )
}

export default BookSearchComponent
