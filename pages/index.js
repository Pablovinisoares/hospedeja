import { useState, useEffect } from "react";

export default function Home() {
  const [nome, setNome] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [reservas, setReservas] = useState([]);

  // Imagem bonita de pousada no Nordeste
  const imagemFundo =
    "https://images.unsplash.com/photo-1600110206297-c85e1a7f7d2b?auto=format&fit=crop&w=1400&q=80";

  useEffect(() => {
    const salvas = localStorage.getItem("reservas");
    if (salvas) setReservas(JSON.parse(salvas));
  }, []);

  useEffect(() => {
    localStorage.setItem("reservas", JSON.stringify(reservas));
  }, [reservas]);

  const adicionar = () => {
    if (nome && checkin && checkout) {
      const nova = { nome, checkin, checkout };
      setReservas([...reservas, nova]);
      setNome("");
      setCheckin("");
      setCheckout("");
    }
  };

  const remover = (i) => {
    const novas = reservas.filter((_, idx) => idx !== i);
    setReservas(novas);
  };

  const gerarRelatorio = () => {
    let texto = "📋 RELATÓRIO DE RESERVAS:\n\n";
    reservas.forEach((r, i) => {
      texto += `${i + 1}. ${r.nome} – Entrada: ${r.checkin}, Saída: ${r.checkout}\n`;
    });
    navigator.clipboard.writeText(texto);
    alert("Relatório copiado! Agora cole no WhatsApp ou Word.");
  };

  const enviarWhatsapp = () => {
    let texto = "📋 RELATÓRIO DE RESERVAS:\n\n";
    reservas.forEach((r, i) => {
      texto += `${i + 1}. ${r.nome} – Entrada: ${r.checkin}, Saída: ${r.checkout}\n`;
    });
    const link = `https://wa.me/?text=${encodeURIComponent(texto)}`;
    window.open(link, "_blank");
  };

  return (
    <div style={{ fontFamily: "Poppins, sans-serif", backgroundColor: "#fefefe" }}>
      <div
        style={{
          backgroundImage: `url(${imagemFundo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "50vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          color: "#fff",
          textShadow: "2px 2px 8px rgba(0,0,0,0.7)",
          padding: 20,
        }}
      >
        <h1 style={{ fontSize: "3rem" }}>🌴 Pousada Nordeste</h1>
        <p style={{ fontSize: "1.2rem" }}>
          Sistema simples e gratuito para controle de reservas.
        </p>
      </div>

      <div style={{ padding: 30, maxWidth: 600, margin: "0 auto" }}>
        <h2 style={{ color: "#008080" }}>Adicionar Reserva</h2>

        <input
          placeholder="Nome do hóspede"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          style={estilo.input}
        />
        <input
          type="date"
          value={checkin}
          onChange={(e) => setCheckin(e.target.value)}
          style={estilo.input}
        />
        <input
          type="date"
          value={checkout}
          onChange={(e) => setCheckout(e.target.value)}
          style={estilo.input}
        />
        <button onClick={adicionar} style={estilo.botao}>
          ➕ Adicionar
        </button>

        <h3 style={{ marginTop: 30 }}>📌 Reservas atuais</h3>
        {reservas.length === 0 && <p>Nenhuma reserva ainda.</p>}
        <ul>
          {reservas.map((r, i) => (
            <li key={i} style={{ marginBottom: 10 }}>
              <b>{r.nome}</b> – {r.checkin} até {r.checkout}
              <button
                onClick={() => remover(i)}
                style={estilo.botaoRemover}
              >
                Remover
              </button>
            </li>
          ))}
        </ul>

        {reservas.length > 0 && (
          <>
            <button onClick={gerarRelatorio} style={estilo.botaoRelatorio}>
              📄 Copiar relatório
            </button>
            <button onClick={enviarWhatsapp} style={estilo.botaoWhatsapp}>
              📲 Enviar via WhatsApp
            </button>
          </>
        )}
      </div>
    </div>
  );
}

const estilo = {
  input: {
    padding: 10,
    margin: "10px 10px 10px 0",
    width: "100%",
    borderRadius: 6,
    border: "1px solid #ccc",
    fontSize: 16,
    backgroundColor: "#fff",
  },
  botao: {
    padding: "10px 20px",
    borderRadius: 6,
    border: "none",
    backgroundColor: "#008080",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: 10,
  },
  botaoRemover: {
    marginLeft: 10,
    padding: "4px 10px",
    fontSize: 14,
    borderRadius: 6,
    backgroundColor: "#d9534f",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  botaoRelatorio: {
    marginTop: 20,
    padding: "10px 20px",
    fontSize: 16,
    borderRadius: 8,
    backgroundColor: "#20c997",
    color: "white",
    border: "none",
    cursor: "pointer",
    marginRight: 10,
  },
  botaoWhatsapp: {
    marginTop: 20,
    padding: "10px 20px",
    fontSize: 16,
    borderRadius: 8,
    backgroundColor: "#25D366",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};
