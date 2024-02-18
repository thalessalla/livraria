import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store/store'
import { removeFromCart } from '../../slices/CartSlices'
import { Link, useNavigate } from 'react-router-dom'
import './carrinho.css'
import { logout } from '../../slices/authSlice'

const CartPage: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cartItems = useSelector((state: RootState) => state.cart.items)

  const handleRemoveFromCart = (itemId: string) => {
    dispatch(removeFromCart(itemId))
  }

  const handleLogout = () => {
    dispatch(logout())
    localStorage.removeItem('token') // Remover o token do localStorage ao fazer logout
    navigate('/')
  }

  return (
    <div className="cart-container">
      <div>
        <h1>Carrinho de Compras</h1>
        <button onClick={handleLogout}>Logout</button>
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
