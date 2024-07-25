import React, { FormEvent, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logging } from "../../utils/logging";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginForm = (): JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const result = await logging(email, password);
    if (result.ok) {
      navigate("/");
    } else {
      toast.error(result.message);
    }
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen w-11/12 m-auto flex items-center justify-center bg-cover bg-center rounded-lg shadow-lg"
      style={{ backgroundImage: `url('/landingimg.png')` }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto">
        <h2 className="text-2xl font-semibold text-center text-green-900 mb-4">
          Iniciar Sesión
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-green-900 text-slate-300 text-lg px-6 py-2 rounded-md"
              disabled={loading}
            >
              {loading ? "Cargando..." : "Iniciar Sesión"}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
