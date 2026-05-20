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

  const openPapago = () => {
    window.open("https://papago.naver.com/", "_blank", "noopener,noreferrer");
  };

  return (
    <div style={{ position: "relative", zIndex: 1, padding: "0 20px" }}>
      {/* 🚀 히어로 영역 */}
      <div className="hero" style={{ textAlign: "center", padding: "60px 0 40px" }}>
        <h1 className="title" style={{ fontSize: "60px", fontWeight: "800", marginBottom: "10px" }}>
          Dealounge
        </h1>
        <p className="subtitle" style={{ color: "#666", marginBottom: "30px" }}>
          원하는 상품을 검색하고 최저가를 찾아보세요!
        </p>

        {/* 🔍 외부 CSS 무력화! 가로 정렬을 보장하는 절대 안전 컨테이너 */}
        <div style={{ maxWidth: "800px", margin: "0 auto", width: "100%" }}>
          <form 
            onSubmit={handleSearch} 
            style={{ 
              display: "flex", 
              gap: "12px", 
              width: "100%", 
              alignItems: "stretch",
              justifyContent: "center"
            }}
          >
            {/* 1. 검색어 입력창 + 검색 버튼 통합 박스 (좌측에서 유연하게 늘어남) */}
            <div 
              style={{ 
                flex: 1, 
                display: "flex", 
                background: "#fff", 
                border: "2px solid #eee", 
                borderRadius: "30px", 
                overflow: "hidden",
                boxShadow: "0 4px 10px rgba(0,0,0,0.03)",
                alignItems: "center",
                padding: "0 6px 0 20px"
              }}
            >
              <input
                type="text"
                placeholder="무엇을 찾으시나요? (영문 검색 시 정확도가 높습니다)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{
                  flex: 1,
                  border: "none",
                  outline: "none",
                  fontSize: "16px",
                  padding: "14px 0",
                  width: "100%",
                  background: "transparent"
                }}
              />
              <button
                type="submit"
                style={{
                  padding: "10px 24px",
                  background: "#000",
                  color: "#fff",
                  border: "none",
                  borderRadius: "24px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "0.2s",
                  whiteSpace: "nowrap"
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#333")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#000")}
              >
                {loading ? "검색 중..." : "검색"}
              </button>
            </div>

            {/* 2. 우측 파파고 번역 버튼 (자기 크기를 고정으로 유지) */}
            <button
              type="button"
              onClick={openPapago}
              style={{
                padding: "0 24px",
                background: "#00c73c",
                color: "#fff",
                borderRadius: "30px",
                border: "none",
                fontSize: "15px",
                fontWeight: "bold",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                boxShadow: "0 4px 12px rgba(0,199,60,0.15)",
                transition: "0.2s",
                whiteSpace: "nowrap",
                flexShrink: 0 // 절대 찌그러지지 않도록 고정
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#00b334")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#00c73c")}
            >
              🦜 Papago 번역
            </button>
          </form>
        </div>
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

                {/* 🔗 사러가기 버튼 */}
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
