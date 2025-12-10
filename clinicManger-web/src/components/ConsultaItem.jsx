import React from "react";

export default function ConsultaItem({
  nome,
  status,
  statusColor,
  data,
  hora,
  especialidade,
  procedimento,
  podeEditar,
  mostrarAcoes,
  onEdit,
  onConfirm,
  onCancel,
}) {
  return (
    <div
      style={{
        padding: "15px 25px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid #eee",
      }}
    >
      <div>
        <div
          style={{
            fontWeight: "bold",
            color: "#7c1145",
            display: "flex",
            gap: "10px",
          }}
        >
          {nome}
          <span
            style={{
              background: statusColor,
              padding: "3px 10px",
              borderRadius: "15px",
              fontSize: "13px",
            }}
          >
            {status}
          </span>
        </div>

        <p style={{ margin: "6px 0", color: "#555" }}>📅 {data}</p>
        <p style={{ margin: 0, color: "#c26797" }}>
          {especialidade} – {procedimento}
        </p>
      </div>

      <div style={{ color: "#666" }}>⏰ {hora}</div>

      <div style={{ display: "flex", gap: "18px", fontSize: "20px" }}>
        {podeEditar ? (
          <span
            style={{ cursor: "pointer", color: "#0066ff" }}
            onClick={onEdit}
          >
            ✏️
          </span>
        ) : mostrarAcoes ? (
          <>
            <span style={{ cursor: "pointer", color: "green" }} onClick={onConfirm}>
              ✔
            </span>
            <span style={{ cursor: "pointer", color: "red" }} onClick={onCancel}>
              ✖
            </span>
          </>
        ) : null}
      </div>
    </div>
  );
}
