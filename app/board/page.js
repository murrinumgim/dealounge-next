"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Board() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setPosts(data || []);
      } catch (error) {
        console.error("데이터 로드 실패:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <div>
          <h1
            className="title"
            style={{ fontSize: "36px", marginBottom: "5px" }}
          >
            커뮤니티 게시판
          </h1>
          <p className="subtitle" style={{ fontSize: "15px" }}>
            핫딜 정보와 직구 후기를 자유롭게 공유하세요.
          </p>
        </div>
        <a
          href="/write"
          style={{
            background: "linear-gradient(45deg, #6c9cff, #ff8fa3)",
            color: "white",
            textDecoration: "none",
            padding: "12px 24px",
            borderRadius: "50px",
            fontWeight: "bold",
            fontSize: "14px",
            boxShadow: "0 4px 15px rgba(108, 156, 255, 0.3)",
          }}
        >
          ✍️ 글쓰기
        </a>
      </div>

      <div
        style={{
          background: "white",
          borderRadius: "16px",
          padding: "20px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
        }}
      >
        {loading ? (
          <p style={{ textAlign: "center", padding: "40px", color: "#999" }}>
            게시글을 불러오는 중입니다...
          </p>
        ) : posts.length > 0 ? (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "left",
            }}
          >
            <thead>
              <tr
                style={{
                  borderBottom: "2px solid #f1f3f5",
                  color: "#666",
                  fontSize: "14px",
                }}
              >
                <th style={{ padding: "15px 10px" }}>내용</th>
                <th
                  style={{
                    padding: "15px 10px",
                    width: "120px",
                    textAlign: "center",
                  }}
                >
                  링크
                </th>
                <th
                  style={{
                    padding: "15px 10px",
                    width: "120px",
                    textAlign: "right",
                  }}
                >
                  작성일
                </th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} style={{ borderBottom: "1px solid #f8f9fa" }}>
                  {/* 제목 & 내용 */}
                  <td style={{ padding: "18px 10px" }}>
                    <div
                      style={{
                        fontWeight: "600",
                        color: "#222",
                        marginBottom: "4px",
                      }}
                    >
                      {post.title}
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        color: "#777",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "450px",
                      }}
                    >
                      {post.content}
                    </div>
                  </td>

                  {/* 🔗 첨부 링크 바로가기 (추가됨) */}
                  <td style={{ padding: "18px 10px", textAlign: "center" }}>
                    {post.link ? (
                      <a
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-block",
                          padding: "6px 12px",
                          background: "#eef3ff",
                          color: "#6c9cff",
                          borderRadius: "6px",
                          fontSize: "12px",
                          fontWeight: "bold",
                          textDecoration: "none",
                        }}
                      >
                        🔗 보러가기
                      </a>
                    ) : (
                      <span style={{ color: "#eee", fontSize: "12px" }}>-</span>
                    )}
                  </td>

                  {/* 작성일 */}
                  <td
                    style={{
                      padding: "18px 10px",
                      color: "#aaa",
                      fontSize: "13px",
                      textAlign: "right",
                    }}
                  >
                    {new Date(post.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ textAlign: "center", padding: "40px", color: "#999" }}>
            아직 등록된 게시글이 없습니다.
          </p>
        )}
      </div>
    </div>
  );
}
