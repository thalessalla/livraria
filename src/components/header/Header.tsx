import { Link } from 'react-router-dom'
import './header.css'
export const Header = () => {
  return (
    <header>
      <div className="container-header">
        <Link className="link" to="/">
          <h2>BookLand</h2>
        </Link>

        <nav>
          <Link className="link" to="/login">
            Login
          </Link>
          <Link className="link" to="/signup">
            Cadastrar
          </Link>
          <Link className="link" to="/carrinho">
            Carrinho
          </Link>
        </nav>
      </div>
    </header>
  )
}
