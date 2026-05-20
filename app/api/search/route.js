export async function POST(req) {
  const { query } = await req.json();

  // 💡 주소 맨 끝의 api_key= 부분에 환경변수가 들어가도록 수정되었습니다.
  const url = `https://serpapi.com/search.json?engine=google_shopping&q=${query}&api_key=${process.env.SERPAPI_KEY}`;
  try {
    const res = await fetch(url);
    const data = await res.json();

    const results =
      data.shopping_results?.map((item) => ({
        name: item.title,
        image: item.thumbnail,
        price: item.price,
        // 💡 핵심 수정: item.link가 없으면 item.product_link라도 가져오도록 보완
        link: item.link || item.product_link || "#",
        source: item.source,
      })) || [];

    return Response.json(results);
  } catch (e) {
    console.error("SerpApi Fetch Error:", e);
    return Response.json([]);
  }
}
