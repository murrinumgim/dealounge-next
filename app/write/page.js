"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function Write() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [link, setLink] = useState(""); // 🔗 링크 상태 추가
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해 주세요.");
      return;
    }

    setLoading(true);
    try {
      // Supabase 테이블에 title, content와 함께 link도 저장합니다.
      const { error } = await supabase
        .from("posts")
        .insert([{ title, content, link: link.trim() || null }]);

      if (error) throw error;

      alert("🎉 글이 성공적으로 등록되었습니다!");
      router.push("/board");
    } catch (error) {
      alert("에러가 발생했습니다. 다시 시도해 주세요.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto" }}>
      <div style={{ marginBottom: "30px" }}>
        <h1 className="title" style={{ fontSize: "36px", marginBottom: "5px" }}>
          새 글 작성
        </h1>
        <p className="subtitle" style={{ fontSize: "15px" }}>
          공유하고 싶은 세일 정보나 직구 팁을 적어주세요.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {/* 제목 입력 */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label
            style={{ fontWeight: "bold", color: "#444", fontSize: "14px" }}
          >
            제목
          </label>
          <input
            type="text"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              padding: "15px",
              borderRadius: "10px",
              border: "1px solid #eee",
              outline: "none",
              fontSize: "16px",
              backgroundColor: "#fbfbfc",
            }}
          />
        </div>

        {/* 🔗 상품 링크 입력 (추가됨) */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label
            style={{ fontWeight: "bold", color: "#444", fontSize: "14px" }}
          >
            상품 링크 (선택)
          </label>
          <input
            type="url"
            placeholder="https://... 관련 상품 주소를 입력하세요 (선택사항)"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            style={{
              padding: "15px",
              borderRadius: "10px",
              border: "1px solid #eee",
              outline: "none",
              fontSize: "16px",
              backgroundColor: "#fbfbfc",
            }}
          />
        </div>

        {/* 내용 입력 */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label
            style={{ fontWeight: "bold", color: "#444", fontSize: "14px" }}
          >
            내용
          </label>
          <textarea
            placeholder="내용을 상세히 입력해 주세요 (예: 구매처, 할인 코드, 가격 정보 등)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            style={{
              padding: "15px",
              borderRadius: "10px",
              border: "1px solid #eee",
              outline: "none",
              fontSize: "16px",
              backgroundColor: "#fbfbfc",
              resize: "none",
              lineHeight: "1.6",
            }}
          />
        </div>

        {/* 버튼 영역 */}
        <div style={{ display: "flex", gap: "12px", marginTop: "10px" }}>
          <button
            type="button"
            onClick={() => router.push("/board")}
            style={{
              flex: 1,
              padding: "16px",
              borderRadius: "50px",
              border: "1px solid #dee2e6",
              background: "white",
              color: "#666",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "15px",
            }}
          >
            취소
          </button>

          <button
            type="submit"
            disabled={loading}
            style={{
              flex: 2,
              padding: "16px",
              borderRadius: "50px",
              border: "none",
              background: "black",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "15px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
            }}
          >
            {loading ? "등록 중..." : "🚀 등록하기"}
          </button>
        </div>
      </form>
    </div>
  );
}
