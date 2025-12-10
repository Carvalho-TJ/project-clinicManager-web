import { useState } from "react";
import ModalBase from "./ModalBase";

const input = {
  width: "100%",
  padding: "10px",
  marginTop: "6px",
  border: "1px solid #ccc",
  borderRadius: "6px",
};

const btnCancelar = {
  width: "100%",
  padding: "12px",
  background: "#ccc",
  color: "black",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  marginTop: "10px",
};

export default function ModalPerfil({ onClose }) {
  const [editando, setEditando] = useState(false);

  const [dados, setDados] = useState({
    nome: "Paula Costa",
    endereco: "Rua das Flores, 123",
    telefone: "(92) 99999-8888",
    nascimento: "1985-06-12",
    estadoCivil: "Solteira",
    senhaAtual: "",
    novaSenha: "",
  });

  function atualizar(e) {
    setDados({ ...dados, [e.target.name]: e.target.value });
  }

  return (
    <ModalBase title="Editar Perfil" onClose={onClose}>
      {!editando ? (
        <button
          style={{
            background: "#7c1145",
            color: "white",
            border: "none",
            padding: "8px 10px",
            borderRadius: "6px",
            cursor: "pointer",
            width: "30%",
            marginBottom: "10px",
          }}
          onClick={() => setEditando(true)}
        >
          Editar
        </button>
      ) : (
        <button
          style={{
            background: "#28a745",
            color: "white",
            border: "none",
            padding: "10px 16px",
            borderRadius: "6px",
            cursor: "pointer",
            width: "30%",
            marginBottom: "15px",
          }}
          onClick={() => {
            setEditando(false);
            onClose();
          }}
        >
          Salvar
        </button>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "30px",
          alignItems: "start",
        }}
      >
        <div>
          <label>Nome Completo</label>
          <input
            name="nome"
            value={dados.nome}
            disabled={!editando}
            onChange={atualizar}
            style={input}
          />
        </div>

        <div>
          <label>Endereço</label>
          <input
            name="endereco"
            value={dados.endereco}
            disabled={!editando}
            onChange={atualizar}
            style={input}
          />
        </div>

        <div>
          <label>Telefone</label>
          <input
            name="telefone"
            value={dados.telefone}
            disabled={!editando}
            onChange={atualizar}
            style={input}
          />
        </div>

        <div>
          <label>Data de Nascimento</label>
          <input
            type="date"
            name="nascimento"
            value={dados.nascimento}
            disabled={!editando}
            onChange={atualizar}
            style={input}
          />
        </div>

        <div>
          <label>Estado Civil</label>
          <input
            name="estadoCivil"
            value={dados.estadoCivil}
            disabled={!editando}
            onChange={atualizar}
            style={input}
          />
        </div>

        <div>
          <label>Senha Atual</label>
          <input
            type="password"
            name="senhaAtual"
            value={dados.senhaAtual}
            disabled={!editando}
            onChange={atualizar}
            style={input}
          />
        </div>

        <div>
          <label>Nova Senha</label>
          <input
            type="password"
            name="novaSenha"
            value={dados.novaSenha}
            disabled={!editando}
            onChange={atualizar}
            style={input}
          />
        </div>
      </div>

      <button style={btnCancelar} onClick={onClose}>
        Fechar
      </button>
    </ModalBase>
  );
}
