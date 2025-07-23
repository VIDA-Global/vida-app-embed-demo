// Helper functions used for calling Vida's REST API.
// All endpoints are prefixed with the base URL defined in `config/constants.js`.
import { VIDA_API_BASE_URL } from "../config/constants.js";

// Construct a request URL and append query parameters from the given object.
function buildUrl(path, params = {}) {
  const url = new URL(`${VIDA_API_BASE_URL}/${path}`);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }
  return url.toString();
}

// Perform a GET request to a Vida API endpoint and return both the raw
// response and parsed JSON data. Errors parsing the body are swallowed to make
// the caller code simpler.
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

// Perform a POST request to a Vida API endpoint.
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
