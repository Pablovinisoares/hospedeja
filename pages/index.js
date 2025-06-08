import { useState, useEffect } from "react";

export default function Home() {
  const [nome, setNome] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [reservas, setReservas] = useState([]);

 const imagemFundo = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1350&q=80";

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
    let texto = "📋 RELATÓRIO DE RESERVAS – HospedeJá\n\n";
    reservas.forEach((r, i) => {
      texto += `${i + 1}. ${r.nome} – Entrada: ${r.checkin}, Saída: ${r.checkout}\n`;
    });
    navigator.clipboard.writeText(texto);
    alert("Relatório copiado! Agora você pode colar no Word ou WhatsApp.");
  };

  const enviarWhatsapp = () => {
    let texto = "📋 RELATÓRIO DE RESERVAS – HospedeJá\n\n";
    reservas.forEach((r, i) => {
      texto += `${i + 1}. ${r.nome} – Entrada: ${r.checkin}, Saída: ${r.checkout}\n`;
    });
    const link = `https://wa.me/?text=${encodeURIComponent(texto)}`;
    window.open(link, "_blank");
  };

  return (
    <div>
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
          color: "#fff",
          textShadow: "2px 2px 6px rgba(0,0,0,0.8)",
          fontFamily: "'Poppins', sans-serif",
          textAlign: "center",
          padding: "0 20px",
        }}
      >
        <h1 style={{ fontSize: "4rem", marginBottom: 10 }}>HospedeJá</h1>
        <p style={{ fontSize: "1.5rem" }}>Hospedagem simples e descomplicada</p>
      </div>

      <div style={{ padding: 30, maxWidth: 600, margin: "0 auto" }}>
        <h2>Nova Reserva</h2>
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

        <h3 style={{ marginTop: 30 }}>📌 Reservas</h3>
        {reservas.length === 0 && <p>Nenhuma reserva ainda.</p>}
        <ul>
          {reservas.map((r, i) => (
            <li key={i} style={{ marginBottom: 10 }}>
              <b>{r.nome}</b> – {r.checkin} até {r.checkout}
              <button onClick={() => remover(i)} style={estilo.botaoRemover}>
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
              📲 Enviar no WhatsApp
            </button>
          </>
        )}
      </div>
    </div>
  );
}

const estilo = {
  input: {
    padding: 12,
    margin: "10px 0",
    width: "100%",
    borderRadius: 6,
    border: "1px solid #ccc",
    fontSize: 16,
  },
  botao: {
    padding: "12px 24px",
    borderRadius: 6,
    border: "none",
    backgroundColor: "#0077b6",
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
    backgroundColor: "#e63946",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  botaoRelatorio: {
    marginTop: 20,
    padding: "10px 20px",
    fontSize: 16,
    borderRadius: 8,
    backgroundColor: "#023e8a",
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
<a href="/dashboard" style={{ marginTop: 20, fontSize: 18, color: '#fff', background: '#0077b6', padding: '10px 20px', borderRadius: 6, textDecoration: 'none' }}>
  Acessar Painel
</a>

