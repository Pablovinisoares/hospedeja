import { useState } from 'react';

export default function Home() {
  const [user, setUser] = useState('');
  const [logged, setLogged] = useState(false);
  const [hospedes, setHospedes] = useState([]);
  const [reservas, setReservas] = useState([]);

  const login = () => {
    if (user.trim()) setLogged(true);
  };

  const addHospede = (nome) => {
    setHospedes([...hospedes, nome]);
  };

  const addReserva = (hospede, data) => {
    setReservas([...reservas, { hospede, data }]);
  };

  if (!logged) {
    return (
      <div style={{ padding: 20 }}>
        <h2>HospedeJá - Login</h2>
        <input placeholder="Seu nome" value={user} onChange={e => setUser(e.target.value)} />
        <button onClick={login}>Entrar</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Bem-vindo, {user}</h2>
      
      <h3>Cadastrar Hóspede</h3>
      <FormHospede onAdd={addHospede} />

      <h3>Cadastrar Reserva</h3>
      <FormReserva hospedes={hospedes} onAdd={addReserva} />

      <h3>Lista de Hóspedes</h3>
      <ul>
        {hospedes.map((h, i) => <li key={i}>{h}</li>)}
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
      <input placeholder="Nome do hóspede" value={nome} onChange={e => setNome(e.target.value)} />
      <button onClick={() => { onAdd(nome); setNome(''); }}>Adicionar</button>
    </div>
  );
}

function FormReserva({ hospedes, onAdd }) {
  const [hospede, setHospede] = useState('');
  const [data, setData] = useState('');
  return (
    <div>
      <select value={hospede} onChange={e => setHospede(e.target.value)}>
        <option value="">Selecione o hóspede</option>
        {hospedes.map((h, i) => <option key={i} value={h}>{h}</option>)}
      </select>
      <input type="date" value={data} onChange={e => setData(e.target.value)} />
      <button onClick={() => { onAdd(hospede, data); setHospede(''); setData(''); }}>Reservar</button>
    </div>
  );
}
