import { useEffect, useState } from "react";
import api from "../../../service/api";
import styles from "../Ambientes/GestaoAmbiente.module.css";
import { Voltar } from "../../components/SetaVoltar/Voltar";

function GestaoGestores() {
  const [gestores, setGestores] = useState([]);
  const [NI, setNI] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [editingId, setEditingId] = useState(null);

  // 📌 Recuperar cargo do usuário logado
  const cargoUsuario = localStorage.getItem("cargo"); // "gestor" ou "professor"

  // 📌 Carregar lista de gestores
  useEffect(() => {
    api.get("/gestores/")
      .then((res) => setGestores(res.data))
      .catch((err) => console.error("Erro ao buscar gestores:", err));
  }, []);

  const carregarGestores = () => {
    api.get("/gestores/")
      .then((res) => setGestores(res.data))
      .catch((err) => console.error("Erro ao buscar gestores:", err));
  };

  // 📌 Adicionar ou Atualizar Gestor (apenas para gestores)
  const handleSubmit = (e) => {
    e.preventDefault();

    const gestorData = {
      NI,
      nome,
      email,
      telefone,
      username,
      password,
      cargo: "G", // Definido automaticamente
    };

    if (editingId) {
      api.put(`/gestores/${editingId}/`, gestorData)
        .then(() => {
          alert("Dados do gestor atualizados!");
          carregarGestores();
          resetForm();
        })
        .catch(() => alert("Erro ao atualizar gestor!"));
    } else {
      api.post("/gestores/", gestorData)
        .then(() => {
          alert("Gestor registrado com sucesso!");
          carregarGestores();
          resetForm();
        })
        .catch(() => alert("Erro ao adicionar gestor!"));
    }
  };

  // 📌 Excluir gestor (apenas para gestores)
  const handleDelete = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este gestor?")) {
      api.delete(`/gestores/${id}/`)
        .then(() => {
          alert("Gestor excluído com sucesso!");
          carregarGestores();
        })
        .catch(() => alert("Erro ao excluir gestor!"));
    }
  };

  // 📌 Iniciar edição de gestor (apenas para gestores)
  const handleEdit = (gestor) => {
    setEditingId(gestor.id);
    setNI(gestor.NI);
    setNome(gestor.nome);
    setEmail(gestor.email);
    setTelefone(gestor.telefone);
    setUsername(gestor.username);
    setPassword(""); // Não carregamos senha já cadastrada
  };

  // 📌 Resetar formulário após envio
  const resetForm = () => {
    setEditingId(null);
    setNI("");
    setNome("");
    setEmail("");
    setTelefone("");
    setUsername("");
    setPassword("");
  };

  return (
    <div className={styles.main}>

      {cargoUsuario === "gestor" && (
        <div className={styles.topo}>
          <Voltar />
          <h1>Gestão de Gestores</h1>
        </div>
      )}

      {cargoUsuario != "gestor" && (
        <div className={styles.topo}>
          <Voltar />
          <h1>Gestores</h1>
        </div>
      )}

      {/* 📌 Exibir formulário apenas para gestores */}
      {cargoUsuario === "gestor" && (
        <form onSubmit={handleSubmit} className={styles.container}>
          <input type="text" placeholder="NI" value={NI} onChange={(e) => setNI(e.target.value)} required />
          <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="text" placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} required />
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">{editingId ? "Atualizar" : "Adicionar"}</button>
        </form>
      )}

      {/* 📌 Lista de gestores */}
      <ul className={styles.lista}>
        {gestores.map((gestor) => (
          <li key={gestor.id} className={styles.itensLista}>
            <div className={styles.textos}>{gestor.nome} - {gestor.email}</div>

            {/* 📌 Exibir botões de editar/excluir apenas para gestores */}
            {cargoUsuario === "gestor" && (
              <>
                <button className={styles.editar} onClick={() => handleEdit(gestor)}>Editar</button>
                <button className={styles.excluir} onClick={() => handleDelete(gestor.id)}>Excluir</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GestaoGestores;
