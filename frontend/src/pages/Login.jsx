import { useState } from "react";
import { login } from "../services/api";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      const data = await login(email, password);

      localStorage.setItem("token", data.token);

      onLogin(data.user);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <main>
      <h1>CrypEx</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <button type="submit">Login</button>

        {error && <p>{error}</p>}
      </form>
    </main>
  );
}
