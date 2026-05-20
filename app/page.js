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

  // 🦜 네이버 파파고 새 탭으로 열기 함수
  const openPapago = () => {
    window.open("https://papago.naver.com/", "_blank", "noopener,noreferrer");
  };

  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      {/* 🚀 히어로 영역 */}
      <div className="hero">
        <h1 className="title" style={{ fontSize: "60px", fontWeight: "800" }}>
          Dealounge
        </h1>
        <p className="subtitle">원하는 상품을 검색하고 최저가를 찾아보세요!</p>

        {/* 🔍 검색 및 번역 컨테이너 */}
        <form onSubmit={handleSearch} className="search-container">
          <div style={{ display: "flex", gap: "10px", width: "100%", alignItems: "center" }}>
            
            {/* 기존 검색창 영역 */}
            <div className="search-box" style={{ flexGrow: 1 }}>
              <input
                type="text"
                placeholder="무엇을 찾으시나요? (영문 검색 시 정확도가 높습니다)"
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

            {/* 🦜 파파고 번역 이동 버튼 */}
            <button
              type="button"
              onClick={openPapago}
              style={{
                height: "50px",
                padding: "0 20px",
                background: "#00c73c", // 파파고 시그니처 그린 컬러
                color: "#fff",
                borderRadius: "30px",
                border: "none",
                fontSize: "14px",
                fontWeight: "bold",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                boxShadow: "0 4px 10px rgba(0,199,60,0.2)",
                transition: "0.2s",
                whiteSpace: "nowrap"
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#00b334")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#00c73c")}
            >
              🦜 Papago 번역
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

                    if (
                      targetLink &&
                      !targetLink.startsWith("http://") &&
                      !targetLink.startsWith("https://")
                    ) {
                      targetLink = `https:${targetLink}`;
                    }

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
                    border: "none",
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
