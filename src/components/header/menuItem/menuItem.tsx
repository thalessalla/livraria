import { Link, useNavigate } from 'react-router-dom'
import { isAuthenticated } from '../../../utils/authUtils'
import { useDispatch } from 'react-redux'
import { logout } from '../../../slices/authSlice'

function MenuItem() {
  const userIsAuthenticated = isAuthenticated()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <div className="menu-item">
      <Link to="/">
        <p> Home</p>
      </Link>

      {!userIsAuthenticated && (
        <>
          <Link to="/login">
            <p> Login</p>
          </Link>
          <Link to="/signup">
            <p> Cadastre-se</p>
          </Link>
        </>
      )}

      {userIsAuthenticated && (
        <Link to="/carrinho">
          <p>Carrinho</p>
        </Link>
      )}

      {userIsAuthenticated && <button onClick={handleLogout} className='logout-menu'>Logout</button>}
    </div>
  )
}

export default MenuItem
