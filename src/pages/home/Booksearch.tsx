import React, { useState } from 'react'
import { useSearchBooksQuery } from '../../slices/bookApiSlice'
import Search from "../../assets/search.svg"

import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../slices/CartSlices';
import Add from "../../assets/add.svg";
import Added from "../../assets/added.svg";
import { RootState } from '../../store/store';


const BookSearchComponent: React.FC = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('')
  const { data, error, isLoading } = useSearchBooksQuery(query);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleAddToCart = (book: any) => {
    dispatch(addToCart(book)); 
  };

  const handleSearch = () => {

    if (query.trim()) {

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
      <img className='book-cover' src={item.volumeInfo.imageLinks.smallThumbnail} alt={item.volumeInfo.title} />
      <h3>{item.volumeInfo.title}</h3>
      <p>{item.volumeInfo.authors && item.volumeInfo.authors.join(', ')}</p>
      {item.saleInfo?.listPrice && (
        <p className='price-card' key={item.saleInfo.listPrice.amount}>
          {'R$ ' + item.saleInfo.listPrice.amount}
        </p>              
      )}
      <button className="btn-add-card" onClick={() => handleAddToCart(item)}>
        <img src={cartItems.includes(item) ? Added : Add} alt="Ícone de salvar" />
      </button>
    </div>
 
    ))}
  </div>
)}
    </div>
  )
}

export default BookSearchComponent
