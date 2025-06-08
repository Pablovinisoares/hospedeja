import { useState, useEffect } from "react";

export default function Dashboard() {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const salvas = localStorage.getItem("reservas");
    if (salvas) setReservas(JSON.parse(salvas));
  }, []);

  const total = reservas.length;
  const hoje = new Date().toISOString().split("T")[0];
  const proximas = reservas.filter(r => r.checkin >= hoje).length;
  const faturamento = total * 300; // Simulação

  return (
    <div style={estilo.pagina}>
      <h1 style={estilo.titulo}>Painel Administrativo</h1>

      <div style={estilo.cards}>
        <Card titulo="📌 Reservas Ativas" valor={total} cor="#0077b6" />
        <Card titulo="📅 Próximas Entradas" valor={proximas} cor="#38b000" />
        <Card titulo="💰 Faturamento Estimado" valor={`R$ ${faturamento}`} cor="#f77f00" />
      </div>

      <div style={estilo.calendario}>
        <h2>📆 Agenda Simples</h2>
        <ul>
          {reservas.map((r, i) => (
            <li key={i}>
              <b>{r.nome}</b>: {r.checkin} → {r.checkout}
            </li>
          ))}
          {reservas.length === 0 && <p>Nenhuma reserva cadastrada.</p>}
        </ul>
      </div>

      <a
        href="https://wa.me/5581999999999?text=Olá,%20quero%20saber%20mais%20sobre%20o%20HospedeJá!"
        target="_blank"
        style={estilo.whatsapp}
        rel="noopener noreferrer"
      >
        💬 Fale no WhatsApp
      </a>
    </div>
  );
}

function Card({ titulo, valor, cor }) {
  return (
    <div style={{ ...estilo.card, backgroundColor: cor }}>
      <h3 style={{ margin: 0 }}>{titulo}</h3>
      <p style={{ fontSize: "1.8rem", fontWeight: "bold" }}>{valor}</p>
    </div>
  );
}

const estilo = {
  pagina: {
    fontFamily: "'Poppins', sans-serif",
    padding: "40px 20px",
    background: "#f0f8ff",
    minHeight: "100vh",
  },
  titulo: {
    fontSize: "2rem",
    textAlign: "center",
    marginBottom: "30px",
  },
  cards: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  card: {
    padding: "20px",
    borderRadius: "10px",
    color: "#fff",
    width: "250px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
  },
  calendario: {
    marginTop: "40px",
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    maxWidth: "600px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  whatsapp: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    backgroundColor: "#25D366",
    color: "#fff",
    padding: "12px 20px",
    borderRadius: "30px",
    textDecoration: "none",
    fontWeight: "bold",
    boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
  },
};
