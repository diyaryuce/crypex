const API_URL = "http://localhost:3000/api";

export async function login(email, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Login failed");
  }

  return data;
}

export async function getWallets() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/wallets`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to load wallets");
  }

  return data;
}

export async function getTransactions() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/transactions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to load transactions");
  }

  return data;
}

export async function buyCrypto(asset, amount) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/orders/buy`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ asset, amount }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Buy failed");
  }

  return data;
}

export async function sellCrypto(asset, amount) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/orders/sell`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ asset, amount }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Sell failed");
  }

  return data;
}
