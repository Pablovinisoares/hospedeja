import { useState } from 'react';

export default function Home() {
  const [user, setUser] = useState('');
  const [logged, setLogged] = useState(false);
  const [hospedes, setHospedes] = useState([]);
  const [reservas, setReservas] = useState([]);

  const login = () => {
    if (user.trim()) setLogged(true);
  };

  const imagemFundo = https://images.unsplash.com/photo-1507089947368-19c1da9775ae

  if (!logged) {
    return (
      <div style={{
        backgroundImage: `url(${imagemFundo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        textShadow: '2px 2px 5px black',
        padding: 20
      }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '10px' }}>HospedeJá</h1>
        <p style={{ fontSize: '1.3rem', marginBottom: 30 }}>Sua pousada, hotel ou resort sempre organizada.</p>
        <input
          placeholder="Digite seu nome"
          value={user}
          onChange={e => setUser(e.target.value)}
          style={{
            padding: '12px',
            fontSize: '16px',
            borderRadius: '8px',
            border: 'none',
            marginBottom: '10px',
            width: '260px'
          }}
        />
        <button
          onClick={login}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            borderRadius: '8px',
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
