export default async function handler(req, res) {
  // 1. 获取前端传过来的请求体和请求方式
  const method = req.method;
  let body = req.body;

  // 2. 构造目标 PHP API 地址
  const targetUrl = "https://110.40.213.69/TestTheWebpage/API/RegisterAPI/Register.php";

  // 3. 配置 fetch 选项
  const fetchOptions = {
    method,
    headers: {
      ...req.headers,
      // 如果你的 PHP 只接受表单数据，可能需要改为:
      // 'Content-Type': 'application/x-www-form-urlencoded'
      'Content-Type': 'application/json'
    },
    // body 仅 POST/PUT 需要
    body: method === 'POST' || method === 'PUT' ? JSON.stringify(body) : undefined,
  };

  try {
    // 4. 发送请求到 PHP API
    const resp = await fetch(targetUrl, fetchOptions);

    // 5. 获取 PHP API 的响应内容
    const data = await resp.text(); // 如果确定返回 JSON，可用 resp.json()

    // 6. 返回给前端
    res.status(resp.status).send(data);
  } catch (error) {
    // 捕获错误
    res.status(500).json({ error: "Proxy error", detail: error.message });
  }
}