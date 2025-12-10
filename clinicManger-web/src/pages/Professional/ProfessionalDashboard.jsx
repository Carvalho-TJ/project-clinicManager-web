// src/pages/ProfessionalDashboard.jsx
import React, { useState } from "react";
import Logo from "../../assets/logo.png"
import { useNavigate } from "react-router-dom";

import ConsultaItem from "../../components/ConsultaItem";
import PacienteItem from "../../components/PacienteItem";

import ModalReagendar from "../../components/modals/ModalReagendar";
import ModalAtendimento from "../../components/modals/ModalAtendimento";
import ModalPerfil from "../../components/modals/ModalPerfil";

export default function ProfessionalDashboard() {
  const navigate = useNavigate();
  const [abaAtual, setAbaAtual] = useState("agenda");

  const [modalReagendar, setModalReagendar] = useState(null);
  const [modalAtendimento, setModalAtendimento] = useState(null);
  const [modalPerfil, setModalPerfil] = useState(false);

  const [menuAberto, setMenuAberto] = useState(false);

  // Consultas
  const [consultas, setConsultas] = useState([
    {
      id: 1,
      nome: "Ana Silva",
      status: "Pendente",
      statusColor: "#f7e48b",
      data: "09/12/2025",
      hora: "09:00",
      especialidade: "Odontologia",
      procedimento: "Limpeza Dental",
      podeEditar: false,
      mostrarAcoes: true,
    },
    {
      id: 2,
      nome: "Carlos Souza",
      status: "Confirmada",
      statusColor: "#b5f5c8",
      data: "09/12/2025",
      hora: "10:30",
      especialidade: "Odontologia",
      procedimento: "Ortodontia",
      podeEditar: true,
      mostrarAcoes: true,
    },
    { id: 3, nome: "Maria Santos", status: "Pendente", statusColor: "#f7e48b", data: "10/12/2025", hora: "14:00", especialidade: "Odontologia", procedimento: "Implante Dentário", podeEditar: false, mostrarAcoes: true, },
  ]);

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
    { id: 3, 
      nome: "Maria Santos",
      email: "maria@email.com",
      telefone: "(92) 99144-9708",
      nascimento: "22/10/1989",  },
  ];

  function confirmarConsulta(id) {
    setConsultas((lista) =>
      lista.map((c) =>
        c.id === id
          ? {
              ...c,
              status: "Confirmada",
              statusColor: "#b5f5c8",
              podeEditar: true,
              mostrarAcoes: false,
            }
          : c
      )
    );
  }

  function cancelarConsulta(id) {
    setConsultas((lista) =>
      lista.map((c) =>
        c.id === id
          ? {
              ...c,
              status: "Cancelada",
              statusColor: "#f8b4b4",
              podeEditar: false,
              mostrarAcoes: false,
            }
          : c
      )
    );
  }

  return (
    <div style={{ backgroundColor: "#fafafa", minHeight: "100vh" }}>
      {/* cabeçalho */}
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

      {/* conteúdo */}
      <div style={{ padding: "20px 40px" }}>
        <p style={{ color: "#555" }}>Bem-vindo(a), Dr(a). Paula Costa</p>

        {/* abas */}
        <div style={{ display: "flex", gap: "30px", marginTop: "20px" }}>
          <div
            onClick={() => setAbaAtual("agenda")}
            style={{
              paddingBottom: "8px",
              borderBottom:
                abaAtual === "agenda"
                  ? "3px solid #7c1145"
                  : "3px solid transparent",
              cursor: "pointer",
              fontWeight: "bold",
              color: abaAtual === "agenda" ? "#7c1145" : "#444",
            }}
          >
            🗓 Minha Agenda
          </div>

          <div
            onClick={() => setAbaAtual("pacientes")}
            style={{
              paddingBottom: "8px",
              borderBottom:
                abaAtual === "pacientes"
                  ? "3px solid #7c1145"
                  : "3px solid transparent",
              cursor: "pointer",
              color: abaAtual === "pacientes" ? "#7c1145" : "#444",
            }}
          >
            📁 Meus Pacientes
          </div>
        </div>

        {/* título */}
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
          {abaAtual === "agenda" ? "Consultas Agendadas" : "Meus Pacientes"}
        </div>

        {/* listagem */}
        <div
          style={{
            background: "#fff",
            borderRadius: "0 0 10px 10px",
            padding: "10px 0",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          {abaAtual === "agenda"
            ? consultas.map((c) => (
                <ConsultaItem
                  key={c.id}
                  {...c}
                  onEdit={() => setModalReagendar(c)}
                  onConfirm={() => confirmarConsulta(c.id)}
                  onCancel={() => cancelarConsulta(c.id)}
                />
              ))
            : pacientes.map((p) => (
                <PacienteItem
                  key={p.id}
                  {...p}
                  onAtender={() => setModalAtendimento(p)}
                />
              ))}
        </div>
      </div>

      {/* modais */}
      {modalReagendar && (
        <ModalReagendar
          consulta={modalReagendar}
          onClose={() => setModalReagendar(null)}
        />
      )}

      {modalAtendimento && (
        <ModalAtendimento
          paciente={modalAtendimento}
          onClose={() => setModalAtendimento(null)}
        />
      )}

      {modalPerfil && (
        <ModalPerfil onClose={() => setModalPerfil(false)} />
      )}
    </div>
  );
}
