import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const { cartItems } = useContext(CartContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-blue-600">
          Useless Store
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/products" className="hover:text-blue-600">
            제품목록
          </Link>
          <Link to="/cart" className="hover:text-blue-600">
            장바구니 ({cartItems.length})
          </Link>
          {isLoggedIn ? (
            <>
              <Link to="/profile" className="hover:text-blue-600">
                프로필
              </Link>
              <button
                onClick={() => setIsLoggedIn(false)}
                className="hover:text-blue-600"
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-600">
                로그인
              </Link>
              <Link to="/signup" className="hover:text-blue-600">
                회원가입
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
