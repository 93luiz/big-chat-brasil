import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider.jsx";

export default function Home() {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ document: "", document_type: "cpf", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submitting:", form);
    setError("");
    setSubmitting(true);

    try {
      await login(form);
      navigate("/conversations");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (user) {
    return <Navigate to="/conversations" replace />;
  }

  return (
    <>
      <div className="d-flex flex-column h-100 py-4">
        <h1>Big Chat Brasil</h1>
        <div className="align-self-center flex-fill d-flex align-items-center" style={{ maxWidth: '400px' }}>
            <div className="card">
                <div className="card-header">
                    Login
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        {error && <div className="alert alert-danger pb-3">{error}</div>}
                        <p className="form-label mb-1">Documento</p>
                        <div className="row mb-3">
                            <div className="col-auto">
                                <div className="form-field">
                                    <input className="radio" name="document_type" type="radio" id="cpf" value="cpf" checked={form.document_type === "cpf"} onChange={handleChange} />
                                    <label for="cpf">CPF</label>
                                </div>
                            </div>
                            <div className="col-auto">
                                <div className="form-field">
                                    <input className="radio" name="document_type" type="radio" id="cnpj" value="cnpj" checked={form.document_type === "cnpj"} onChange={handleChange}  />
                                    <label for="cnpj">CNPJ</label>
                                </div>
                            </div>
                        </div>
                        <div className="form-field mb-3">
                            <label for="document" className="form-label">Número do documento</label>
                            <input type="text" className="form-control" name="document" id="document" value={form.document} onChange={handleChange}  />
                        </div>
                        <div className="form-field mb-3">
                            <label for="password" className="form-label">Senha</label>
                            <input type="password" className="form-control" name="password" id="password" value={form.password} onChange={handleChange} />
                        </div>
                        <div className="form-field">
                            <input type="submit" value={submitting ? "Entrando..." : "Entrar"} className="btn btn-primary w-100" disabled={submitting} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
      </div>
    </>
  );
}