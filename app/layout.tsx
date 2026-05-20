import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dealounge",
  description: "최저가 검색 및 딜 공유 커뮤니티",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <div className="container">
          {/* 🔥 고정 사이드바 */}
          <aside className="sidebar">
            <h2>Dealounge</h2>
            <a href="/">🏠 홈으로</a>
            <a href="/board">📋 게시판</a>
            <a href="/write">✍️ 글쓰기</a>
            <a href="/notice">📢 공지사항</a>
          </aside>

          {/* 🔥 각 페이지의 콘텐츠가 들어가는 메인 영역 */}
          <main className="main">
            {children}

            {/* 🔥 하단 푸터 영역 */}
            <footer className="site-footer">
              <div className="footer-content">
                <div className="footer-info">
                  <h3>Dealounge 과제 프로젝트</h3>
                  <p>
                    수업 과제물로 제작된 최저가 검색 및 게시판 웹사이트입니다.
                  </p>
                  <p>Stack: Next.js, Supabase, Vercel, SerpApi</p>
                </div>
                <div className="footer-copy">
                  &copy; {new Date().getFullYear()} Dealounge. All rights
                  reserved.
                </div>
              </div>
            </footer>
          </main>
        </div>
      </body>
    </html>
  );
}
