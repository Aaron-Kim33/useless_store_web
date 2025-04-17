import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const { cartItems, addToCart, decreaseQuantity, removeFromCart, clearCart } =
    useContext(CartContext);

  // 총 결제 금액 계산
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h2 className="text-2xl font-bold mb-6">장바구니</h2>
      {cartItems.length === 0 ? (
        <div className="text-center text-gray-500 py-20">
          장바구니가 비어 있습니다.
        </div>
      ) : (
        <>
          <ul className="divide-y">
            {cartItems.map((item) => (
              <li key={item.id} className="flex items-center py-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded mr-4 border"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-500">
                    {item.price.toLocaleString()}원
                  </p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="px-2 py-1 border rounded text-lg"
                    >
                      -
                    </button>
                    <span className="mx-3">{item.quantity}</span>
                    <button
                      onClick={() => addToCart(item, 1)}
                      className="px-2 py-1 border rounded text-lg"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-4 text-red-500 hover:underline"
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center mt-8">
            <span className="text-xl font-bold">
              총 결제금액: {totalPrice.toLocaleString()}원
            </span>
            <button
              onClick={clearCart}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            >
              장바구니 비우기
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
