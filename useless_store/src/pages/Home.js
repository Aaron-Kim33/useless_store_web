// src/pages/Home.jsx
import { useState } from "react";
import ProductCard from "../components/ProductCard";

// 👇 여기에 제품을 직접 추가하세요!
const products = [
  {
    id: 1,
    name: "무의미한 스티커",
    price: 5000,
    image: "https://via.placeholder.com/200?text=Sticker",
    description: "이건 정말 쓸모가 없습니다.",
  },
  {
    id: 2,
    name: "쓸모없는 머그컵",
    price: 15000,
    image: "https://via.placeholder.com/200?text=Mug",
    description: "이 머그컵은 아무 쓸모가 없습니다.",
  },
  {
    id: 3,
    name: "의미없는 볼펜",
    price: 3000,
    image: "https://via.placeholder.com/200?text=Pen",
    description: "이 볼펜은 글씨가 써지지 않습니다.",
  },
  // ...여기에 계속 추가하면 됩니다!
];

const itemsPerPage = 16; // 4x4 그리드

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // 현재 페이지에 표시할 상품 계산
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="container mx-auto p-4">
      {/* 4x4 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* 페이지네이션 컨트롤 */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          이전
        </button>
        <span className="px-4 py-2">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default Home;
