import { useEffect, useState } from "react";
import api from "../../../service/api";
import styles from "../Ambientes/GestaoAmbiente.module.css";
import { Voltar } from "../../components/SetaVoltar/Voltar";

function GestaoDisciplinas() {
  const [disciplinas, setDisciplinas] = useState([]);
  const [nome, setNome] = useState("");
  const [curso, setCurso] = useState("");
  const [cargaHoraria, setCargaHoraria] = useState("");
  const [descricao, setDescricao] = useState("");
  const [professorResponsavel, setProfessorResponsavel] = useState("");
  const [professores, setProfessores] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // 📌 Recuperar cargo do usuário logado
  const cargoUsuario = localStorage.getItem("cargo"); // "gestor" ou "professor"

  // 📌 Função para carregar disciplinas com base no cargo
  const carregarDisciplinas = () => {
    const endpoint = cargoUsuario === "gestor" ? "/disciplinas/" : "/professoresDisciplinas/";

    api.get(endpoint)
      .then((res) => {
        console.log("Disciplinas carregadas:", res.data);
        setDisciplinas(res.data || []);
      })
      .catch((err) => console.error("Erro ao buscar disciplinas:", err));
  };

  // 📌 Carregar lista de disciplinas ao iniciar e após alteração
  useEffect(() => {
    carregarDisciplinas();
  }, [cargoUsuario]);

  // 📌 Carregar lista de professores para seleção (apenas para gestores)
  useEffect(() => {
    if (cargoUsuario === "gestor") {
      api.get("/professores/")
        .then((res) => setProfessores(res.data || []))
        .catch((err) => console.error("Erro ao buscar professores:", err));
    }
  }, [cargoUsuario]);

  // 📌 Adicionar ou Atualizar Disciplina (apenas gestores)
  const handleSubmit = (e) => {
    e.preventDefault();

    const disciplinaData = {
      nome,
      curso,
      carga_horaria: cargaHoraria,
      descricao,
      professor_responsavel: professorResponsavel,
    };

    if (editingId) {
      api.put(`/disciplinas/${editingId}/`, disciplinaData)
        .then(() => {
          alert("Disciplina atualizada com sucesso!");
          carregarDisciplinas();
          resetForm();
        })
        .catch(() => alert("Erro ao atualizar disciplina!"));
    } else {
      api.post("/disciplinas/", disciplinaData)
        .then(() => {
          alert("Disciplina cadastrada com sucesso!");
          carregarDisciplinas();
          resetForm();
        })
        .catch(() => alert("Erro ao cadastrar disciplina!"));
    }
  };

  // 📌 Excluir disciplina (apenas gestores)
  const handleDelete = (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta disciplina?")) {
      api.delete(`/disciplinas/${id}/`)
        .then(() => {
          alert("Disciplina excluída com sucesso!");
          carregarDisciplinas();
        })
        .catch(() => alert("Erro ao excluir disciplina!"));
    }
  };

  // 📌 Iniciar edição de disciplina (apenas gestores)
  const handleEdit = (disciplina) => {
    setEditingId(disciplina.id);
    setNome(disciplina.nome);
    setCurso(disciplina.curso);
    setCargaHoraria(disciplina.carga_horaria);
    setDescricao(disciplina.descricao);
    setProfessorResponsavel(disciplina.professor_responsavel);
  };

  // 📌 Resetar formulário após envio
  const resetForm = () => {
    setEditingId(null);
    setNome("");
    setCurso("");
    setCargaHoraria("");
    setDescricao("");
    setProfessorResponsavel("");
  };

  return (
    <div className={styles.main}>

      {cargoUsuario === "gestor" && (
        <div className={styles.topo }>
          <Voltar />
          <h1>Gestão de Disciplinas</h1>
        </div>
      )}

      {cargoUsuario != "gestor" && (
        <div className={styles.topo }>
          <Voltar />
          <h1>oi de Disciplinas</h1>
        </div>
      )}
      
      {/* 📌 Exibir formulário apenas para gestores */}
      {cargoUsuario === "gestor" && (
        <form onSubmit={handleSubmit} className={styles.container}>
          <input type="text" placeholder="Nome da Disciplina" value={nome} onChange={(e) => setNome(e.target.value)} required />
          <input type="text" placeholder="Curso" value={curso} onChange={(e) => setCurso(e.target.value)} required />
          <input type="number" placeholder="Carga Horária" value={cargaHoraria} onChange={(e) => setCargaHoraria(e.target.value)} required />
          <textarea placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} required />

          {/* Select para professor responsável */}
          <select value={professorResponsavel} onChange={(e) => setProfessorResponsavel(e.target.value)} required>
            <option value="">Selecione um professor</option>
            {professores.map((professor) => (
              <option key={professor.id} value={professor.id}>
                {professor.nome}
              </option>
            ))}
          </select>

          <button type="submit">{editingId ? "Atualizar" : "Cadastrar Disciplina"}</button>
        </form>
      )}

      {/* 📌 Lista de disciplinas */}
        <ul className={styles.lista}>
            {disciplinas.map((disciplina) => (
                <li key={disciplina.id} className={styles.itensLista}>
                  <div className={styles.textos}>
                    <strong>{disciplina.nome}</strong> - {disciplina.curso}
                    <br />
                    ⏳ Carga Horária: {disciplina.carga_horaria}h
                    <br />
                    📚 Professor: {disciplina.professor_nome}  
                    <br />
                    📝 {disciplina.descricao}
                    <br />
                </div>
                {cargoUsuario === "gestor" && (
                    <>
                    <button className={styles.editar} onClick={() => handleEdit(disciplina)}>Editar</button>
                    <button className={styles.excluir} onClick={() => handleDelete(disciplina.id)}>Excluir</button>
                    </>
                )}
                </li>
            ))}
        </ul>


    </div>
  );
}

export default GestaoDisciplinas;
