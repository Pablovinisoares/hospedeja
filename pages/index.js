import { useState } from "react";

export default function Home() {
  const [user, setUser] = useState("");
  const [logged, setLogged] = useState(false);

  const login = () => {
    if (user.trim()) setLogged(true);
  };

  const imagemFundo =
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1350&q=80";

  if (!logged) {
    return (
      <div
        style={{
          backgroundImage: `url(${imagemFundo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          textShadow: "2px 2px 5px rgba(0,0,0,0.8)",
          padding: 20,
        }}
      >
        <h1 style={{ fontSize: "3.5rem", marginBottom: "10px" }}>HospedeJá</h1>
        <p style={{ fontSize: "1.3rem", marginBottom: 30 }}>
          Gerencie suas pousadas e resorts com facilidade.
        </p>
        <input
          placeholder="Digite seu nome"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          style={{
            padding: "12px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "none",
            marginBottom: "10px",
            width: "280px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            color: "#333",
          }}
        />
        <button
          onClick={login}
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#14b8a6",
            color: "white",
            cursor: "pointer",
            fontWeight: "600",
            boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
          }}
        >
          Entrar
        </button>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", padding: 40 }}>
      <h2 style={{ color: "#0a9477" }}>Bem-vindo, {user}!</h2>
      <p>Em breve: painel administrativo.</p>
    </div>
  );
}
