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

  async function handleDemoLogin() {
    setError("");

    try {
      const data = await login("drizzy@yucecode.no", "gangshit");

      localStorage.setItem("token", data.token);

      onLogin(data.user);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <main className="bg-[#151515] min-h-screen text-white placeholder:text-white flex flex-col justify-center items-center gap-12">
      <h1 className="emerald-gradient text-6xl font-semibold">CrypEx</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center"
      >
        <div className="flex gap-4">
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="border border-[#3c3c3c] rounded-3xl p-4 outline-none"
          />

          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="border border-[#3c3c3c] rounded-3xl p-4 outline-none"
          />
        </div>

        <button
          type="submit"
          className="
            cursor-pointer bg-[radial-gradient(50.42%_92.5%_at_50.42%_7.5%,#6EE7B7_0%,#047857_100%)]
            rounded-3xl p-4 w-30 mt-4 hover:scale-[1.05] transition duration-200
          "
        >
          <span className="text-[#151515] text-xl">Login</span>
        </button>

        <button
          type="button"
          onClick={handleDemoLogin}
          className="
            mt-4 border border-emerald-500/30 px-5 py-3 rounded-3xl p-4 w-50 
            hover:scale-[1.05] transition duration-200 cursor-pointer
          "
        >
          Demo login
        </button>

        {error && <p>{error}</p>}
      </form>
    </main>
  );
}
