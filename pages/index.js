import { useState } from 'react';

export default function Home() {
  const [user, setUser] = useState('');
  const [logged, setLogged] = useState(false);
  const [hospedes, setHospedes] = useState([]);
  const [reservas, setReservas] = useState([]);

  const login = () => {
    if (user.trim()) setLogged(true);
  };

  if (!logged) {
    return (
      <div style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c")',
        backgroundSize: 'cover',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        textShadow: '1px 1px 2px black'
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>Bem-vindo ao HospedeJá</h1>
        <input
          placeholder="Digite seu nome"
          value={user}
          onChange={e => setUser(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '16px',
            borderRadius: '5px',
            border: 'none',
            marginBottom: '10px',
            width: '250px'
          }}
        />
        <button
          onClick={login}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: '#00c38e',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          Entrar
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <h2 style={{ color: '#00c38e' }}>Painel de Controle - {user}</h2>

      <h3>Cadastrar Hóspede</h3>
      <FormHospede onAdd={(nome) => setHospedes([...hospedes, nome])} />

      <h3>Cadastrar Reserva</h3>
      <FormReserva
        hospedes={hospedes}
        onAdd={(hospede, data) =>
          setReservas([...reservas, { hospede, data }])
        }
      />

      <h3>Lista de Hóspedes</h3>
      <ul>
        {hospedes.map((h, i) => (
          <li key={i}>{h}</li>
        ))}
      </ul>

      <h3>Reservas</h3>
      <ul>
        {reservas.map((r, i) => (
          <li key={i}>{r.hospede} - {r.data}</li>
        ))}
      </ul>
    </div>
  );
}

function FormHospede({ onAdd }) {
  const [nome, setNome] = useState('');
  return (
    <div>
      <input
        placeholder="Nome do hóspede"
        value={nome}
        onChange={e => setNome(e.target.value)}
        style={{ padding: '5px', marginRight: '10px' }}
      />
      <button onClick={() => { onAdd(nome); setNome(''); }} style={{ backgroundColor: '#00c38e', color: 'white', border: 'none', padding: '5px 10px' }}>
        Adicionar
      </button>
    </div>
  );
}

function FormReserva({ hospedes, onAdd }) {
  const [hospede, setHospede] = useState('');
  const [data, setData] = useState('');
  return (
    <div>
      <select value={hospede} onChange={e => setHospede(e.target.value)} style={{ padding: '5px', marginRight: '10px' }}>
        <option value="">Selecione o hóspede</option>
        {hospedes.map((h, i) => (
          <option key={i} value={h}>{h}</option>
        ))}
      </select>
      <input
        type="date"
        value={data}
        onChange={e => setData(e.target.value)}
        style={{ padding: '5px', marginRight: '10px' }}
      />
      <button onClick={() => { onAdd(hospede, data); setHospede(''); setData(''); }} style={{ backgroundColor: '#00c38e', color: 'white', border: 'none', padding: '5px 10px' }}>
        Reservar
      </button>
    </div>
  );
}

