const API_URL = "http://localhost:1000";

export async function logEntry() {
  const response = await fetch(`${API_URL}/api/logs`);
  return await response.json();
}

export async function addEntry(data) {
  const created = await fetch(`${API_URL}/api/logs`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data)
  });
  return await created.json();
}
