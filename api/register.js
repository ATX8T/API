import https from "https";

export default async function handler(req, res) {
  const agent = new https.Agent({ rejectUnauthorized: false }); // 关闭证书校验

  try {
    const proxyResp = await fetch("https://110.40.213.69/TestTheWebpage/API/RegisterAPI/Register.php", {
      method: req.method,
      headers: { "Content-Type": "application/json" },
      body: req.method === "POST" ? JSON.stringify(req.body) : undefined,
      agent, // 重点是加上 agent
    });
    const data = await proxyResp.text();
    res.status(proxyResp.status).send(data);
  } catch (error) {
    res.status(500).json({ error: "Proxy error", detail: error.message });
  }
}