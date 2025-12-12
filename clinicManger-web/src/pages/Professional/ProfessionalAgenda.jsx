import React, { useState } from "react";
import Logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

import ConsultaItem from "../../components/ConsultaItem";
import ModalReagendar from "../../components/modals/ModalReagendar";
import ModalPerfil from "../../components/modals/ModalPerfil";

export default function ProfessionalDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [modalReagendar, setModalReagendar] = useState(null);
  const [modalPerfil, setModalPerfil] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);

  // Consultas simuladas
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
    {
      id: 3,
      nome: "Maria Santos",
      status: "Pendente",
      statusColor: "#f7e48b",
      data: "10/12/2025",
      hora: "14:00",
      especialidade: "Odontologia",
      procedimento: "Implante Dentário",
      podeEditar: false,
      mostrarAcoes: true,
    },
  ]);

  // Funções de ação
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
          Consultas Agendadas
        </div>

        {/* Listagem de consultas */}
        <div
          style={{
            background: "#fff",
            borderRadius: "0 0 10px 10px",
            padding: "10px 0",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          {consultas.map((c) => (
            <ConsultaItem
              key={c.id}
              {...c}
              onEdit={() => setModalReagendar(c)}
              onConfirm={() => confirmarConsulta(c.id)}
              onCancel={() => cancelarConsulta(c.id)}
            />
          ))}
        </div>
      </div>

      {/* Modais */}
      {modalReagendar && (
        <ModalReagendar
          consulta={modalReagendar}
          onClose={() => setModalReagendar(null)}
        />
      )}

      {modalPerfil && <ModalPerfil onClose={() => setModalPerfil(false)} />}
    </div>
  );
}
