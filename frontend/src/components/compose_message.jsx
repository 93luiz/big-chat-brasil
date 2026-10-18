import { useEffect, useState } from "react";


export default function ComposeMessage({ id, onMessageSent }) {
    const [form, setForm] = useState({ text: "" });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`/api/conversation/${id}/message`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            setForm({ ...form, ['text']: ''});
            onMessageSent();
        } catch (err) {
            // Exibir erro
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="border-top">
            <form className="p-2" onSubmit={handleSubmit}>
                <div className="row g-2">
                    <div className="col">
                        <input type="text" className="form-control" name="text" id="text" value={form.text} onChange={handleChange}  />
                    </div>
                    <div className="col-auto">
                        <input type="submit" value="Enviar" className="btn btn-primary w-100" disabled={loading} />
                    </div>
                </div>
            </form>
        </div>
    );
}