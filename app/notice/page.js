"use client";

export default function Notice() {
  // 📢 화면에 보여줄 공지사항 데이터 (여기에 편하게 수정해서 쓰시면 됩니다!)
  const notices = [
    {
      id: 1,
      title: "🚀 Dealounge 웹사이트 베타 오픈 안내",
      date: "2026.05.20",
      content:
        "안녕하세요, Dealounge 관리자입니다. Next.js와 Supabase를 기반으로 한 최저가 검색 및 커뮤니티 플랫폼이 오픈되었습니다! 자유롭게 핫딜을 공유해 보세요.",
    },
    {
      id: 2,
      title: "🔒 보안 및 API 키 환경변수 분리 적용 완료",
      date: "2026.05.18",
      content:
        "안전한 서비스 운영을 위해 SerpApi 및 Supabase Key의 보안 조치가 완료되었습니다. 안심하고 커뮤니티를 이용해 주시기 바랍니다.",
    },
    {
      id: 3,
      title: "📋 커뮤니티 이용 규칙 및 글쓰기 안내",
      date: "2026.05.15",
      content:
        "해외 직구, 세일 정보 공유 시 가능하면 타인에게 도움이 되도록 '상품 링크'를 함께 첨부해 주시면 감사하겠습니다. 비방이나 광고성 글은 제한될 수 있습니다.",
    },
  ];

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      {/* 상단 타이틀 */}
      <div style={{ marginBottom: "30px" }}>
        <h1 className="title" style={{ fontSize: "36px", marginBottom: "5px" }}>
          📢 공지사항
        </h1>
        <p className="subtitle" style={{ fontSize: "15px" }}>
          Dealounge의 중요한 소식과 안내 사항을 전해드립니다.
        </p>
      </div>

      {/* 공지사항 리스트 */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {notices.map((notice) => (
          <div
            key={notice.id}
            style={{
              background: "white",
              padding: "25px 30px",
              borderRadius: "16px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
              border: "1px solid #f1f3f5",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "12px",
              }}
            >
              <h3
                style={{ fontSize: "18px", fontWeight: "700", color: "#111" }}
              >
                {notice.title}
              </h3>
              <span style={{ fontSize: "13px", color: "#aaa" }}>
                {notice.date}
              </span>
            </div>
            <p
              style={{
                fontSize: "14px",
                color: "#555",
                lineHeight: "1.6",
                whiteSpace: "pre-wrap",
              }}
            >
              {notice.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
