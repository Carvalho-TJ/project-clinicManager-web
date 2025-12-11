// src/pages/ProfessionalPatients.jsx
import React, { useState } from "react";
import Logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

import PacienteItem from "../../components/PacienteItem";
import ModalAtendimento from "../../components/modals/ModalAtendimento";
import ModalPerfil from "../../components/modals/ModalPerfil";

export default function ProfessionalPatients() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [modalAtendimento, setModalAtendimento] = useState(null);
  const [modalPerfil, setModalPerfil] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);

  // Pacientes simulados
  const pacientes = [
    {
      id: 1,
      nome: "Ana Silva",
      email: "ana@email.com",
      telefone: "(92) 99123-4567",
      nascimento: "14/05/1990",
    },
    {
      id: 2,
      nome: "Carlos Souza",
      email: "carlos@email.com",
      telefone: "(92) 99234-5678",
      nascimento: "21/08/1985",
    },
    {
      id: 3,
      nome: "Maria Santos",
      email: "maria@email.com",
      telefone: "(92) 99144-9708",
      nascimento: "22/10/1989",
    },
  ];

  return (
    <div style={{ backgroundColor: "#fafafa", minHeight: "100vh" }}>
      {/* Cabeçalho */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px 40px",
          borderBottom: "1px solid #ddd",
          background: "#fff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img src={Logo} alt="logo" style={{ height: "40px" }} />
          <h2 style={{ color: "#7c1145", margin: 0 }}>Portal do Profissional</h2>
        </div>

        <div style={{ position: "relative" }}>
          <span
            style={{ cursor: "pointer", fontSize: "22px", color: "#7c1145" }}
            onClick={() => setMenuAberto(!menuAberto)}
          >
            ⋮
          </span>

          {menuAberto && (
            <div
              style={{
                position: "absolute",
                right: 0,
                top: "28px",
                background: "white",
                borderRadius: "8px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                width: "160px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  padding: "12px",
                  cursor: "pointer",
                  borderBottom: "1px solid #eee",
                }}
                onClick={() => {
                  setModalPerfil(true);
                  setMenuAberto(false);
                }}
              >
                Editar Perfil
              </div>

              <div
                style={{ padding: "12px", cursor: "pointer", color: "red" }}
                onClick={() => navigate("/")}
              >
                Sair
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Conteúdo */}
      <div style={{ padding: "20px 40px" }}>
        {/* Título */}
        <div
          style={{
            marginTop: "30px",
            background: "linear-gradient(145deg,#9e3d6d,#c26797)",
            color: "white",
            padding: "14px 20px",
            borderRadius: "10px 10px 0 0",
            fontWeight: "bold",
          }}
        >
          Meus Pacientes
        </div>

        {/* Listagem de pacientes */}
        <div
          style={{
            background: "#fff",
            borderRadius: "0 0 10px 10px",
            padding: "10px 0",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          {pacientes.map((p) => (
            <PacienteItem
              key={p.id}
              {...p}
              onAtender={() => setModalAtendimento(p)}
            />
          ))}
        </div>
      </div>

      {/* Modais */}
      {modalAtendimento && (
        <ModalAtendimento
          paciente={modalAtendimento}
          onClose={() => setModalAtendimento(null)}
        />
      )}

      {modalPerfil && <ModalPerfil onClose={() => setModalPerfil(false)} />}
    </div>
  );
}
