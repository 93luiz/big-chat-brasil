import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage("Could not reach the API"));
  }, []);

  return (
    <>
      <div className="d-flex flex-column h-100 py-4">
        <h1>Welcome</h1>
        <div className="align-self-center flex-fill d-flex align-items-center" style={{ maxWidth: '400px' }}>
            <div className="card">
                <div className="card-header">
                    Login
                </div>
                <div className="card-body">
                    <form>
                        <p className="form-label mb-1">Documento</p>
                        <div className="row mb-3">
                            <div className="col-auto">
                                <div class="form-field">
                                    <input class="radio" name="document_type" type="radio" id="cpf" />
                                    <label for="cpf">CPF</label>
                                </div>
                            </div>
                            <div className="col-auto">
                                <div class="form-field">
                                    <input class="radio" name="document_type" type="radio" id="cnpj" />
                                    <label for="cnpj">CNPJ</label>
                                </div>
                            </div>
                        </div>
                        <div class="form-field mb-3">
                            <label for="document" class="form-label">Número do documento</label>
                            <input type="text" class="form-control" id="document" />
                        </div>
                        <div class="form-field">
                            <input type="submit" value="Entrar" className="btn btn-primary w-100" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
      </div>
    </>
  );
}