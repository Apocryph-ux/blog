import { useState } from "react";
import { useAuth } from "../AuthContext";
import "./style.css";
import { useNavigate } from 'react-router-dom';

export default function AuthForm({ mode}) {



  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const isRegister = mode === "register";
  const title = isRegister ? "Регистрация" : "Авторизация";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const result = isRegister ? await register(email, password) : await login(email, password);

    if (result.success) {
      setMessage(isRegister ? "Успешная регистрация" : "Успешный вход");
      navigate('/');

    } else {
      setMessage(result.error);
    }

    setLoading(false);
  };

  return (


   <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2 className="auth-title">{title}</h2>

        <input
          type="email"
          placeholder="Введите email"
          value={email}
          className="auth-input"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Введите пароль"
          value={password}
          className="auth-input"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="auth-btn" disabled={loading}>
          {loading ? "Отправка..." : title}
        </button>

        {message && <p className="auth-message">{message}</p>}
      </form>
    </div>
  );
}


