export default function Home() {
  const imagemFundo = "https://images.unsplash.com/photo-1603394028895-a7f73c2d3e3f?auto=format&fit=crop&w=1470&q=80"; // resort praia Nordeste

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundImage: `url(${imagemFundo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        textShadow: "2px 2px 8px rgba(0,0,0,0.8)",
        fontFamily: "'Poppins', sans-serif",
        padding: "0 20px",
        boxSizing: "border-box",
      }}
    >
      <h1 style={{ fontSize: "4rem", margin: 0 }}>HospedeJá</h1>
      <p style={{ fontSize: "1.5rem", marginTop: "10px" }}>
        Hospedagem simples e descomplicada
      </p>
    </div>
  );
}

