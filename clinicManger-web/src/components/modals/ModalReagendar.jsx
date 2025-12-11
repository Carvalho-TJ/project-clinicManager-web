import ModalBase from "./ModalBase";

const input = {
  width: "100%",
  padding: "10px",
  marginTop: "6px",
  border: "1px solid #ccc",
  borderRadius: "6px",
};

const btnSalvar = {
  width: "100%",
  padding: "12px",
  background: "#7c1145",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  marginTop: "10px",
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

export default function ModalReagendar({ consulta, onClose }) {
  return (
    <ModalBase title="Reagendar Consulta" onClose={onClose}>
      <label>Nova Data</label>
      <input type="date" style={input} />

      <label>Nova Hora</label>
      <input type="time" style={input} />

      <button style={btnSalvar} onClick={onClose}>
        Salvar
      </button>
      <button style={btnCancelar} onClick={onClose}>
        Cancelar
      </button>
    </ModalBase>
  );
}
