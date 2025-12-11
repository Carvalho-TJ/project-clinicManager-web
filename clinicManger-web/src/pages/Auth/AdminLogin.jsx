import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { useAuth } from "../../contexts/AuthContext";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();

  // 🔹 Estados para os campos de login e senha
  const [loginField, setLoginField] = useState(""); 
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    try {
      // envia { login, senha } para o backend
      const userData = await login({ login: loginField, senha });

      const redirectPath = localStorage.getItem("redirectAfterLogin") || "/admin/dashboard";
      localStorage.removeItem("redirectAfterLogin");

      navigate(redirectPath, { replace: true });
    } catch (err) {
      setError(err.message);
    }
  }

  const inputStyle = { width: "100%", padding: "12px", marginBottom: "12px", border: "1px solid #ccc", borderRadius: "6px", fontSize: "14px" };

  return (
    <div style={{ height: "90vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #9d0f6b, #c45b8d)", padding: "20px" }}>
      <div style={{ width: "550px", padding: "40px", borderRadius: "12px", background: "white", boxShadow: "0 4px 20px rgba(0,0,0,0.2)", textAlign: "center" }}>
        <img src={Logo} alt="Logo" style={{ width: "100px", marginBottom: "25px" }} />
        <h2 style={{ margin: "10px", color: "#9d0f6b" }}>Portal Administrativo</h2>
        <p style={{ marginBottom: "20px", color: "#777" }}>Acesso exclusivo para administração do sistema</p>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Login"
            value={loginField}
            onChange={(e) => setLoginField(e.target.value)}
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            style={inputStyle}
          />

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button type="submit" style={{ width: "100%", padding: "12px", borderRadius: "6px", border: "none", background: "linear-gradient(135deg, #9d0f6b, #c45b8d)", color: "white", fontSize: "16px", cursor: "pointer", marginTop: "10px" }}>
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
