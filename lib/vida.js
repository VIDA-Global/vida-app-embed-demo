const VIDA_BASE_URL = "https://api.vida.dev/api/v2";

function buildUrl(path, params = {}) {
  const url = new URL(`${VIDA_BASE_URL}/${path}`);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }
  return url.toString();
}

export async function vidaGet(path, params) {
  const res = await fetch(buildUrl(path, params), { method: "GET" });
  let data = null;
  try {
    data = await res.json();
  } catch (_) {
    // ignore JSON errors
  }
  return { res, data };
}

export async function vidaPost(path, params, body) {
  const res = await fetch(buildUrl(path, params), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  let data = null;
  try {
    data = await res.json();
  } catch (_) {
    // ignore JSON errors
  }
  return { res, data };
}
