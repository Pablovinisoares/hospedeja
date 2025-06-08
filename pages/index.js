import { useState, useEffect } from "react";

export default function Home() {
  const [nome, setNome] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [reservas, setReservas] = useState([]);

  // Carrega reservas do LocalStorage ao abrir a página
  useEffect(() => {
    const armazenadas = localStorage.getItem("reservas");
    if (armazenadas) {
      setReservas(JSON.parse(armazenadas));
    }
  }, []);

  // Atualiza LocalStorage sempre que reservas mudarem
  useEffect(() => {
    localStorage.setItem("reservas", JSON.stringify(reservas));
  }, [reservas]);

  const adicionarReserva = () => {
    if (nome && checkin && checkout) {
      const nova = { nome, checkin, checkout };
      setReservas([...reservas, nova]);
      setNome("");
      setCheckin("");
      setCheckout("");
    }
  };

  const removerReserva = (index) => {
    const novas = reservas.filter((_, i) => i !== index);
    setReservas(novas);
  };

  const gerarRelatorio = () => {
    let texto = "📋 RELATÓRIO DE RESERVAS:\n\n";
    reservas.forEach((r, i) => {
      texto += `${i + 1}. ${r.nome} – Entrada: ${r.checkin}, Saída: ${r.checkout}\n`;
    });
    navigator.clipboard.writeText(texto);
    alert("Relatório copiado! Agora você pode colar no WhatsApp ou Word.");
  };

  return (
    <div style={{ fontFamily: "Poppins, sans-serif", padding: 30 }}>
      <h1 style={{ color: "#0a9477" }}>HospedeJá - Reservas</h1>

      <div style={{ marginBottom: 20 }}>
        <input
          placeholder="Nome do hóspede"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          style={estilos.input}
        />
        <input
          type="date"
          value={checkin}
          onChange={(e) => setCheckin(e.target.value)}
          style={estilos.input}
        />
        <input
          type="date"
          value={checkout}
          onChange={(e) => setCheckout(e.target.value)}
          style={estilos.input}
        />
        <button onClick={adicionarReserva} style={estilos.botao}>
          Adicionar
        </button>
      </div>

      <h3 style={{ marginTop: 30 }}>📌 Reservas</h3>
      {reservas.length === 0 && <p>Nenhuma reserva ainda.</p>}
      <ul>
        {reservas.map((r, i) => (
          <li key={i} style={{ marginBottom: 10 }}>
            <b>{r.nome}</b> – {r.checkin} até {r.checkout}
            <button
              onClick={() => removerReserva(i)}
              style={estilos.botaoRemover}
            >
              Remover
            </button>
          </li>
        ))}
      </ul>

      {reservas.length > 0 && (
        <button onClick={gerarRelatorio} style={estilos.botaoRelatorio}>
          📄 Copiar relatório
        </button>
      )}
    </div>
  );
}

const estilos = {
  input: {
    padding: 10,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 6,
    border: "1px solid #ccc",
    fontSize: 16,
  },
  botao: {
    padding: "10px 20px",
    borderRadius: 6,
    border: "none",
    backgroundColor: "#14b8a6",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },
  botaoRemover: {
    marginLeft: 10,
    padding: "4px 10px",
    fontSize: 14,
    borderRadius: 6,
    backgroundColor: "#e11d48",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  botaoRelatorio: {
    marginTop: 20,
    padding: "10px 20px",
    fontSize: 16,
    borderRadius: 8,
    backgroundColor: "#0a9477",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};
