import { useContext, useState, Fragment } from "react";
import { CartContext } from "../context/CartContext";
import { Dialog, Transition } from "@headlessui/react";
import { motion } from "framer-motion";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const openModal = () => {
    setQuantity(1);
    setIsOpen(true);
  };
  const closeModal = () => setIsOpen(false);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    closeModal();
  };

  return (
    <div className="border p-4 rounded-lg shadow-md flex flex-col">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover mb-4 rounded"
      />
      <h3 className="text-lg font-bold mb-2">{product.name}</h3>
      <p className="text-gray-600 mb-4 flex-grow">{product.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-red-500 font-bold">
          {product.price.toLocaleString()}원
        </span>
        <button
          onClick={openModal}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          장바구니 추가
        </button>
      </div>

      {/* 모달 */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          {/* 배경 어둡게 */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-60"
            leave="ease-in duration-200"
            leaveFrom="opacity-60"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black" />
          </Transition.Child>

          {/* 모달 박스 애니메이션 */}
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6"
              >
                <Dialog.Title className="text-lg font-semibold mb-4">
                  {product.name} 수량 선택
                </Dialog.Title>
                <div className="flex items-center justify-center mb-6 space-x-4">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-4 py-2 border rounded text-xl select-none hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="text-2xl font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-4 py-2 border rounded text-xl select-none hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                  >
                    취소
                  </button>
                  <button
                    onClick={handleAddToCart}
                    className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                  >
                    장바구니 담기
                  </button>
                </div>
              </motion.div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default ProductCard;
