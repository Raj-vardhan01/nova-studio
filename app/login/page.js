"use client";

import { useState } from "react";

export default function LoginPage() {
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    const response = await fetch(
      "/api/login",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          password,
        }),
      }
    );

    const data = await response.json();

    if (data.success) {
      localStorage.setItem(
        "adminLoggedIn",
        "true"
      );

      window.location.href =
        "/admin";
    } else {
      alert("Wrong Password");
    }
  }

  return (
    <main style={{ padding: "40px" }}>
      <h1>Admin Login</h1>

      <form onSubmit={handleLogin}>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <br />
        <br />

        <button type="submit">
          Login
        </button>
      </form>
    </main>
  );
}
