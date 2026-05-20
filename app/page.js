"use client";

import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("검색 중 오류 발생:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      {/* 🚀 히어로 영역 */}
      <div className="hero">
        <h1 className="title" style={{ fontSize: "60px", fontWeight: "800" }}>
          Dealounge
        </h1>
        <p className="subtitle">원하는 상품을 검색하고 최저가를 찾아보세요!</p>

        <form onSubmit={handleSearch} className="search-container">
          <div className="search-box">
            <input
              type="text"
              placeholder="무엇을 찾으시나요?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              type="submit"
              className="btn-search"
              style={{ cursor: "pointer" }}
            >
              {loading ? "검색 중..." : "검색"}
            </button>
          </div>
        </form>
      </div>

      {/* 📦 검색 결과 출력 영역 */}
      <div style={{ marginTop: "40px", position: "relative", zIndex: 10 }}>
        {products.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "20px",
            }}
          >
            {products.map((product, index) => (
              <div
                key={index}
                style={{
                  background: "white",
                  padding: "20px",
                  borderRadius: "12px",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                }}
              >
                <div>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "contain",
                      marginBottom: "15px",
                    }}
                  />
                  <h4
                    style={{
                      fontSize: "14px",
                      height: "40px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "normal",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      color: "#222",
                      marginBottom: "5px",
                    }}
                  >
                    {product.name}
                  </h4>
                  <p
                    style={{
                      color: "#ff8fa3",
                      fontWeight: "bold",
                      margin: "5px 0",
                      fontSize: "16px",
                    }}
                  >
                    {product.price}
                  </p>
                  <small
                    style={{
                      color: "#aaa",
                      display: "block",
                      marginBottom: "15px",
                    }}
                  >
                    {product.source}
                  </small>
                </div>

                {/* 🔗 확실하게 작동하는 사러가기 버튼 */}
                <button
                  onClick={() => {
                    let targetLink = product.link;

                    // 주소 앞에 http나 https가 없으면 붙여주는 안전장치
                    if (
                      targetLink &&
                      !targetLink.startsWith("http://") &&
                      !targetLink.startsWith("https://")
                    ) {
                      targetLink = `https:${targetLink}`;
                    }

                    // 새 탭으로 강제 이동 유도
                    if (targetLink) {
                      window.open(targetLink, "_blank", "noopener,noreferrer");
                    } else {
                      alert("이 상품은 연결할 수 있는 링크 주소가 없습니다.");
                    }
                  }}
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "12px 0",
                    background: "#000",
                    color: "#fff",
                    borderRadius: "30px",
                    border: "none", // 버튼 기본 테두리 제거
                    fontSize: "13px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    transition: "0.2s",
                    position: "relative",
                    zIndex: 20,
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#333")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "#000")
                  }
                >
                  🛒 사러가기
                </button>
              </div>
            ))}
          </div>
        ) : (
          !loading && (
            <p
              style={{ textAlign: "center", color: "#999", marginTop: "60px" }}
            >
              검색 결과가 없습니다. 상품을 검색해 보세요!
            </p>
          )
        )}
      </div>
    </div>
  );
}
