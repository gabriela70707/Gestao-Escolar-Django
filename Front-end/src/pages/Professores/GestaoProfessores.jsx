import { useEffect, useState } from "react";
import api from "../../../service/api";
import styles from "../Ambientes/GestaoAmbiente.module.css";
import { Voltar } from "../../components/SetaVoltar/Voltar";


function GestaoProfessores() {
  const [professores, setProfessores] = useState([]);
  const [NI, setNI] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [editingId, setEditingId] = useState(null);

  // 📌 Recuperar cargo do usuário logado
  const cargoUsuario = localStorage.getItem("cargo"); // "gestor" ou "professor"

  // 📌 Carregar lista de professores
  useEffect(() => {
    api.get("/professores/")
      .then((res) => setProfessores(res.data))
      .catch((err) => console.error("Erro ao buscar professores:", err));
  }, []);


  const carregarProfessores = () => {
    api.get("/professores/")
      .then((res) => setProfessores(res.data))
      .catch((err) => console.error("Erro ao buscar professores:", err));
  };

  // 📌 Adicionar ou Atualizar Professor (apenas para gestores)
  const handleSubmit = (e) => {
    e.preventDefault();

    const professorData = {
      NI,
      nome,
      email,
      telefone,
      username,
      password,
      cargo: "P", // Definido automaticamente
    };

    if (editingId) {
      api.put(`/professores/${editingId}/`, professorData)
        .then(() => {
          alert("Dados do professor atualizados!");
          carregarProfessores();
          resetForm();
        })
        .catch(() => alert("Erro ao atualizar professor!"));
    } else {
      api.post("/professores/", professorData)
        .then(() => {
          alert("Professor registrado com sucesso!");
          carregarProfessores();
          resetForm();
        })
        .catch(() => alert("Erro ao adicionar professor!"));
    }
  };

  // 📌 Excluir professor (apenas para gestores)
  const handleDelete = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este professor?")) {
      api.delete(`/professores/${id}/`)
        .then(() => {
          alert("Professor excluído com sucesso!");
          carregarProfessores();
        })
        .catch(() => alert("Erro ao excluir professor!"));
    }
  };

  // 📌 Iniciar edição de professor (apenas para gestores)
  const handleEdit = (professor) => {
    setEditingId(professor.id);
    setNI(professor.NI);
    setNome(professor.nome);
    setEmail(professor.email);
    setTelefone(professor.telefone);
    setUsername(professor.username);
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
          <h1>Gestão de Professores</h1>
        </div>
      )}

      {cargoUsuario != "gestor" && (
        <div className={styles.topo}>
          <Voltar />
          <h1>Professores</h1>
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

      {/* 📌 Lista de professores */}
      <ul className={styles.lista}>
        {professores.map((professor) => (
          <li key={professor.id} className={styles.itensLista}>
            {professor.nome} - {professor.email}

            {/* 📌 Exibir botões de editar/excluir apenas para gestores */}
            {cargoUsuario === "gestor" && (
              <>
                <button className={styles.editar} onClick={() => handleEdit(professor)}>Editar</button>
                <button className={styles.excluir} onClick={() => handleDelete(professor.id)}>Excluir</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GestaoProfessores;
