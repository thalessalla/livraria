// import React, { useEffect, useState } from 'react';
// import axios, { AxiosError } from 'axios';
// import { Pagination } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import { addToCart } from '../../slices/CartSlices';
// import Add from "../../assets/add.svg";
// import Added from "../../assets/added.svg";
// import { RootState } from '../../store/store';

// import './home.css';

// const BookListComponent: React.FC = () => {
//   const dispatch = useDispatch();
//   const cartItems = useSelector((state: RootState) => state.cart.items);
//   const [books, setBooks] = useState<any[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [page, setPage] = useState<number>(1);

//   const handleAddToCart = (book: any) => {
//     dispatch(addToCart(book));
//   };

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const maxResults = 12;
//         const startIndex = (page - 1) * maxResults;

//         const response = await axios.get(
//           'https://www.googleapis.com/books/v1/volumes',
//           {
//             params: {
//               q: "react",
//               startIndex: startIndex,
//               maxResults: maxResults,
//             },
//           }
//         );

//         setBooks(response.data.items)
//         setLoading(false);
//       } catch (error) {
//         if (axios.isAxiosError(error)) {
//           setError(
//             'Erro ao carregar os livros: ' + (error as AxiosError).message
//           )
//         } else {
//           setError(
//             'Erro ao carregar os livros: ' + (error as AxiosError).toString()
//           )
//         }
//         setLoading(false);
//       }
//     }

//     fetchBooks();
//   }, [page]);

//   const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
//     setPage(value);
//   };

//   if (loading) {
//     return <div>Carregando...</div>
//   }

//   if (error) {
//     return <div>Ocorreu um erro: {error}</div>
//   }

//   return (
//     <div className='section-books'>
//       <h2>Mais populares</h2>
//       <div className='container-books'>
//         {books.map((book) => (
//           <div className='card-book' key={book.id}>
//             <img className='book-cover' src={book.volumeInfo.imageLinks.smallThumbnail} alt={book.volumeInfo.title} />
//             <h3>{book.volumeInfo.title}</h3>
//             <p>
//               {book.volumeInfo.authors && book.volumeInfo.authors.join(', ')}
//             </p>

//             {book.saleInfo?.listPrice && (
//               <p className='price-card' key={book.saleInfo.listPrice.amount}>
//                 {'R$ ' + book.saleInfo.listPrice.amount}
//               </p>
//             )}
//              <button className="btn-add-card" onClick={() => handleAddToCart(book)}>
//                 <img src={cartItems.includes(book) ? Added : Add} alt="Ícone de salvar" />
//              </button>
//           </div>
//         ))}
//       </div>
//       <Pagination
//         count={10}
//         page={page}
//         onChange={handlePageChange}
//       />
//     </div>
//   );
// }

// export default BookListComponent;

import React, { useEffect, useState } from 'react'
import axios, { AxiosError } from 'axios'
import { Pagination } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../slices/CartSlices'
import Add from '../../assets/add.svg'
import Added from '../../assets/added.svg'
import { RootState } from '../../store/store'
import { useNavigate } from 'react-router-dom'
import { isAuthenticated } from '../../utils/authUtils'

import './home.css'

const BookListComponent: React.FC = () => {
  const dispatch = useDispatch()
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const [books, setBooks] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState<number>(1)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const maxResults = 12
        const startIndex = (page - 1) * maxResults

        const response = await axios.get(
          'https://www.googleapis.com/books/v1/volumes',
          {
            params: {
              q: 'react',
              startIndex: startIndex,
              maxResults: maxResults,
            },
          }
        )

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
  }, [page])

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value)
  }

const handleBuyButtonClick = (book: any) => {
  // Verificar se o usuário está autenticado
  if (isAuthenticated()) {
    // Verificar se o livro já está no carrinho
    const isInCart = cartItems.includes(book)
    if (isInCart) {
      // Se o livro já estiver no carrinho, redirecionar para a página do carrinho
      navigate('/carrinho')
    } else {
      // Se o livro não estiver no carrinho, adicionar ao carrinho e redirecionar para a página do carrinho
      dispatch(addToCart(book))
      navigate('/carrinho')
    }
  } else {
    // Se o usuário não estiver autenticado, redirecionar para a página de login
    navigate('/login')
  }
}

  if (loading) {
    return <div>Carregando...</div>
  }

  if (error) {
    return <div>Ocorreu um erro: {error}</div>
  }

  return (
    <div className="section-books">
      <h2>Mais populares</h2>
      <div className="container-books">
        {books.map((book) => (
          <div className="card-book" key={book.id}>
            <img
              className="book-cover"
              src={book.volumeInfo.imageLinks.smallThumbnail}
              alt={book.volumeInfo.title}
            />
            <h3>{book.volumeInfo.title}</h3>
            <p>
              {book.volumeInfo.authors && book.volumeInfo.authors.join(', ')}
            </p>

            {book.saleInfo?.listPrice && (
              <p className="price-card" key={book.saleInfo.listPrice.amount}>
                {'R$ ' + book.saleInfo.listPrice.amount}
              </p>
            )}
            <button
              className="btn-add-card"
              onClick={() => handleBuyButtonClick(book)}
            >
              <img
                src={cartItems.includes(book) ? Added : Add}
                alt="Ícone de salvar"
              />
            </button>
          </div>
        ))}
      </div>
      <Pagination count={10} page={page} onChange={handlePageChange} />
    </div>
  )
}

export default BookListComponent
