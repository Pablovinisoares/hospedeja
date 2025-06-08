import { useState } from "react";

export default function Home() {
  const [user, setUser] = useState("");
  const [logged, setLogged] = useState(false);
  const [selecao, setSelecao] = useState("hospedes");

  const [hospedes, setHospedes] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [hoteis, setHoteis] = useState([]);

  const login = () => {
    if (user.trim()) setLogged(true);
  };

  const logout = () => {
    setLogged(false);
    setUser("");
    setSelecao("hospedes");
  };

  // Imagem de fundo: resort na praia do Nordeste (praia paradisíaca)
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
        const styles = {
  input: {
    padding: 12,
    fontSize: 16,
    borderRadius: 8,
    border: "1px solid #ccc",
    marginBottom: 15,
    width: "280px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
  },
  button: {
    padding: "12px 24px",
    fontSize: 16,
    borderRadius: 8,
    border: "none",
    backgroundColor: "#14b8a6",
    color: "white",
    cursor: "pointer",
    fontWeight: 600,
    transition: "background-color 0.3s ease",
  },
  buttonRemove: {
    padding: "6px 12px",
    fontSize: 14,
    borderRadius: 8,
    border: "none",
    backgroundColor: "#e63946",
    color: "white",
    marginLeft: 10,
    cursor: "pointer",
    fontWeight: 600,
    transition: "background-color 0.3s ease",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "2px solid #0a9477",
    paddingBottom: 15,
    marginBottom: 20,
  },
  nav: {
    marginTop: 20,
    marginBottom: 20,
  },
  navButton: {
    padding: "10px 24px",
    marginRight: 12,
    borderRadius: 8,
    border: "2px solid #0a9477",
    backgroundColor: "white",
    color: "#0a9477",
    cursor: "pointer",
    fontWeight: 600,
    transition: "all 0.3s ease",
  },
  navButtonActive: {
    padding: "10px 24px",
    marginRight: 12,
    borderRadius: 8,
    border: "none",
    backgroundColor: "#0a9477",
    color: "white",
    cursor: "pointer",
    fontWeight: 600,
    transition: "all 0.3s ease",
  },
  select: {
    padding: 10,
    fontSize: 16,
    borderRadius: 8,
    border: "1px solid #ccc",
    boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
  },
};

        {selecao === "reservas" && (
          <ReservasSection
            reservas={reservas}
            setReservas={setReservas}
            hospedes={hospedes}
            hoteis={hoteis}
          />
        )}
        {selecao === "hoteis" && (
          <HoteisSection hoteis={hoteis} setHoteis={setHoteis} />
        )}
      </section>
    </div>
  );
}

function HospedesSection({ hospedes, setHospedes }) {
  const [nome, setNome] = useState("");

  const adicionar = () => {
    if (nome.trim()) {
      setHospedes([...hospedes, nome.trim()]);
      setNome("");
    }
  };

  const remover = (index) => {
    setHospedes(hospedes.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h3>Gerenciar Hóspedes</h3>
      <input
        placeholder="Nome do hóspede"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        style={styles.input}
      />
      <button onClick={adicionar} style={styles.button}>
        Adicionar
      </button>

      <ul>
        {hospedes.map((h, i) => (
          <li key={i} style={{ marginBottom: 8 }}>
            {h}{" "}
            <button onClick={() => remover(i)} style={styles.buttonRemove}>
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ReservasSection({ reservas, setReservas, hospedes, hoteis }) {
  const [hospedeSelecionado, setHospedeSelecionado] = useState("");
  const [hotelSelecionado, setHotelSelecionado] = useState("");
  const [data, setData] = useState("");

  const adicionar = () => {
    if (hospedeSelecionado && hotelSelecionado && data) {
      setReservas([
        ...reservas,
        { hospede: hospedeSelecionado, hotel: hotelSelecionado, data },
      ]);
      setHospedeSelecionado("");
      setHotelSelecionado("");
      setData("");
    }
  };

  const remover = (index) => {
    setReservas(reservas.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h3>Gerenciar Reservas</h3>
      <div style={{ marginBottom: 12 }}>
        <select
          value={hospedeSelecionado}
          onChange={(e) => setHospedeSelecionado(e.target.value)}
          style={styles.select}
        >
          <option value="">Selecione o hóspede</option>
          {hospedes.map((h, i) => (
            <option key={i} value={h}>
              {h}
            </option>
          ))}
        </select>

        <select
          value={hotelSelecionado}
          onChange={(e) => setHotelSelecionado(e.target.value)}
          style={{ ...styles.select, marginLeft: 10 }}
        >
          <option value="">Selecione a pousada/hotel</option>
          {hoteis.map((h, i) => (
            <option key={i} value={h}>
              {h}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
          style={{ ...styles.input, marginLeft: 10, width: 160 }}
        />

        <button onClick={adicionar} style={{ ...styles.button, marginLeft: 10 }}>
          Adicionar
        </button>
      </div>

      <ul>
        {reservas.map((r, i) => (
          <li key={i} style={{ marginBottom: 8 }}>
            {r.hospede} reservou na {r.hotel} para {r.data}{" "}
            <button onClick={() => remover(i)} style={styles.buttonRemove}>
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function HoteisSection({ hoteis, setHoteis }) {
  const [nome, setNome] = useState("");

  const adicionar = () => {
    if (nome.trim()) {
      setHoteis([...hoteis, nome.trim()]);
      setNome("");
    }
  };

  const remover = (index) => {
    setHoteis(hoteis.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h3>Gerenciar Pousadas/Hotéis</h3>
      <input
        placeholder="Nome da pousada/hotel"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        style={styles.input}
      />
      <button onClick={adicionar} style={styles.button}>
        Adicionar
      </button>

      <ul>
        {hoteis.map((h, i) => (
          <li key={i} style={{ marginBottom: 8 }}>
            {h}{" "}
            <button onClick={() => remover(i)} style={styles.buttonRemove}>
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  input: {
    padding: 10,
    fontSize: 16,
    borderRadius: 6,
    border: "1px solid #ccc",
    marginBottom: 10,
  },
  button: {
    padding: "10px 20px",
    fontSize: 16,
    borderRadius: 6,
    border: "none",
    backgroundColor: "#00c38e",
    color: "white",
    cursor: "pointer",
  },
  buttonRemove: {
    padding: "4px 10px",
    fontSize: 14,
    borderRadius: 6,
    border: "none",
    backgroundColor: "#ff4d4d",
    color: "white",
    marginLeft: 10,
    cursor: "pointer",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nav: {
    marginTop: 20,
  },
  navButton: {
    padding: "8px 20px",
    marginRight: 10,
    borderRadius: 6,
    border: "1px solid #00c38e",
    backgroundColor: "white",
    color: "#00c38e",
    cursor: "pointer",
  },
  navButtonActive: {
    padding: "8px 20px",
    marginRight: 10,
    borderRadius: 6,
    border: "none",
    backgroundColor: "#00c38e",
    color: "white",
    cursor: "pointer",
  },
  select: {
    padding: 8,
    fontSize: 16,
    borderRadius: 6,
    border: "1px solid #ccc",
  },
};
