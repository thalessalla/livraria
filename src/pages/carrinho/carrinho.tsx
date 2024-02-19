import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store/store'
import { removeFromCart } from '../../slices/CartSlices'
import { Link } from 'react-router-dom'
import './carrinho.css'


const CartPage: React.FC = () => {
  const dispatch = useDispatch()
  const cartItems = useSelector((state: RootState) => state.cart.items)

  const handleRemoveFromCart = (itemId: string) => {
    dispatch(removeFromCart(itemId))
  }

  return (
    <div className="cart-container">
      <div>
        <h1>Carrinho de Compras</h1>
        
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p>O carrinho está vazio.</p>
          ) : (
            cartItems.map((item) => (
              <div className="item-cart" key={item.id}>
                <div>
                  <img
                    src={item.volumeInfo.imageLinks.smallThumbnail}
                    alt={item.volumeInfo.title}
                  />
                </div>

                <div>
                  <h3>{item.volumeInfo.title}</h3>
                  <p>
                    {item.volumeInfo.authors &&
                      item.volumeInfo.authors.join(', ')}
                  </p>
                  <button
                    className="remove-btn"
                    onClick={() => handleRemoveFromCart(item.id)}
                  >
                    Remover
                  </button>
                </div>

                <div>
                  <p>R$ {item.saleInfo.listPrice.amount}</p>
                </div>
              </div>
            ))
          )}

          <div className="container-btns-cart">
            <Link to="/">
              <button className="btn-secundary">Voltar</button>
            </Link>
            <button className="checkout-btn">Confirmar</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
