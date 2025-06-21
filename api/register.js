import https from "https";

export default async function handler(req, res) {
  const agent = new https.Agent({ rejectUnauthorized: false });

  // 只允许 POST
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  try {
    const resp = await fetch("https://110.40.213.69/TestTheWebpage/API/RegisterAPI/Register.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
      agent,
    });
    const data = await resp.text();
    res.status(resp.status).send(data);
  } catch (e) {
    res.status(500).json({ error: "Proxy error", detail: e.message });
  }
}