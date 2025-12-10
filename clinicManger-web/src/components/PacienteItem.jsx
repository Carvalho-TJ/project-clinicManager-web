import React from "react";

export default function PacienteItem({
  nome,
  email,
  telefone,
  nascimento,
  onAtender,
}) {
  return (
    <div
      style={{
        padding: "15px 25px",
        borderBottom: "1px solid #eee",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>
        <h3 style={{ margin: 0, color: "#7c1145" }}>{nome}</h3>
        <p style={{ margin: "5px 0" }}>📧 {email}</p>
        <p style={{ margin: "5px 0" }}>📞 {telefone}</p>
        <p style={{ margin: 0 }}>🎂 {nascimento}</p>
      </div>

      <button
        onClick={onAtender}
        style={{
          background: "#7c1145",
          color: "white",
          border: "none",
          padding: "10px 16px",
          borderRadius: "6px",
          cursor: "pointer",
          height: "40px",
        }}
      >
        Registrar Atendimento
      </button>
    </div>
  );
}
