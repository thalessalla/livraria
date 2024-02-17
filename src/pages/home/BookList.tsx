
import React, { useEffect, useState } from 'react'
import axios, { AxiosError } from 'axios'
import { Pagination } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../slices/CartSlices'; 
import Add from "../../assets/add.svg";
import Added from "../../assets/added.svg";

import  './home.css'

const BookListComponent: React.FC = () => {
  const dispatch = useDispatch();
  const [books, setBooks] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState<number>(1); // Adiciona o estado da página atual
  const [savedBook, setSavedBook] = useState<string[]>([]);




  const handleAddCart = (book: any) => {
    dispatch(addToCart(book));
    if (savedBook.includes(book)) {
      setSavedBook(savedBook.filter(id => id !== book));
    } else {
      setSavedBook([...savedBook, book]);
    }
  };




  useEffect(() => {

    const fetchBooks = async () => {
      try {
        const maxResults = 12; // Define o número máximo de resultados por solicitação
        const startIndex = (page - 1) * maxResults; // Calcula o índice de início com base na página atual

        const response = await axios.get(
          'https://www.googleapis.com/books/v1/volumes',
          {
            params: {
              q: "react",
              startIndex: startIndex,
              maxResults: maxResults,
            },
          }
        );

        setBooks(response.data.items)
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
  }, [page]) // Adiciona a dependência de página ao useEffect para refletir as mudanças na página

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value); // Atualiza a página atual
  };

  if (loading) {
    return <div>Carregando...</div>
  }

  if (error) {
    return <div>Ocorreu um erro: {error}</div>
  }

  return (
    <div className='section-books'>
      <h2>Mais populares</h2>
      <div className='container-books'>
        {books.map((book) => (
          <div className='card-book' key={book.id}>
            <img className='book-cover' src={book.volumeInfo.imageLinks.smallThumbnail} alt={book.volumeInfo.title} />
            <h3>{book.volumeInfo.title}</h3>
            <p>
              {book.volumeInfo.authors && book.volumeInfo.authors.join(', ')}
            </p>
            
            {book.saleInfo?.listPrice && (
              <p className='price-card' key={book.saleInfo.listPrice.amount}>
                {'R$ ' + book.saleInfo.listPrice.amount}
              </p>              
            )}
             <button className="btn-add-card"  onClick={() => handleAddCart(book.id)}>
                <img src={savedBook.includes(book.id) ? Added : Add} alt="Ícone de salvar" />
             </button>
          </div>
        ))}
      </div>
      <Pagination
        count={10} // Define o número total de páginas (você pode calcular isso com base no total de resultados)
        page={page} // Define a página atual
        onChange={handlePageChange} // Define a função de mudança de página
      />
    </div>
  )
}

export default BookListComponent
