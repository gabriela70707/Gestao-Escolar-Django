import { useEffect, useState } from "react";
import api from "../../../service/api";
import styles from "./GestaoAmbiente.module.css";
import { Voltar } from "../../components/SetaVoltar/Voltar";

function GestaoAmbientes() {
  const [ambientes, setAmbientes] = useState([]);
  const [dataInicio, setDataInicio] = useState("");
  const [dataTermino, setDataTermino] = useState("");
  const [periodo, setPeriodo] = useState("M"); // Default: Manhã
  const [salaReservada, setSalaReservada] = useState("1"); // Default: Sala 1
  const [disciplinaProfessor, setDisciplinaProfessor] = useState("");
  const [disciplinas, setDisciplinas] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // 📌 Recuperar cargo do usuário logado
  const cargoUsuario = localStorage.getItem("cargo"); // "gestor" ou "professor"

  // 📌 Função para carregar lista de ambientes
  const carregarAmbientes = () => {
    const endpoint = cargoUsuario === "gestor" ? "/reservaAmbiente/" : "/professoresReservas/";

    api.get(endpoint)
      .then((res) => {
        console.log("Ambientes carregados:", res.data);
        setAmbientes(res.data || []);
      })
      .catch((err) => console.error("Erro ao buscar ambientes:", err));
  };

  // 📌 Carregar lista de ambientes ao iniciar e após qualquer alteração
  useEffect(() => {
    carregarAmbientes();
  }, [cargoUsuario]);

  // 📌 Carregar lista de disciplinas para seleção
  useEffect(() => {
    api.get("/disciplinas/")
      .then((res) => setDisciplinas(res.data || []))
      .catch((err) => console.error("Erro ao buscar disciplinas:", err));
  }, []);

  // 📌 Adicionar ou Atualizar Ambiente (apenas gestores)
  const handleSubmit = (e) => {
    e.preventDefault();

const formatDate = (dateString) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1); // Adiciona um dia à data
    return date.toISOString().split("T")[0]; // Mantém apenas YYYY-MM-DD
};

const ambienteData = {
    data_inicio: formatDate(dataInicio),
    data_termino: formatDate(dataTermino),
    periodo: periodo,
    sala_reservada: salaReservada,
    disciplina_professor: disciplinaProfessor
};

console.log("Dados enviados ao backend:", ambienteData);










    if (editingId) {
      api.put(`/reservaAmbiente/${editingId}/`, ambienteData)
        .then(() => {
          alert("Reserva atualizada com sucesso!");
          carregarAmbientes();
          resetForm();
        })
        .catch(() => alert("Erro ao atualizar reserva!"));
    } else {
      api.post("/reservaAmbiente/", ambienteData)
        .then(() => {
          alert("Ambiente reservado com sucesso!");
          carregarAmbientes();
          resetForm();
        })
        .catch((error) => {
          console.error("Erro ao reservar ambiente:", error.response);
          alert(`Erro ao reservar ambiente: ${error.response?.data?.message || "Erro desconhecido"}`);
        });
    }
  };

  // 📌 Excluir ambiente (apenas gestores)
  const handleDelete = (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta reserva?")) {
      api.delete(`/reservaAmbiente/${id}/`)
        .then(() => {
          alert("Reserva excluída com sucesso!");
          carregarAmbientes();
        })
        .catch(() => alert("Erro ao excluir reserva!"));
    }
  };

  // 📌 Iniciar edição de ambiente (apenas gestores)
  const handleEdit = (ambiente) => {
    setEditingId(ambiente.id);
    setDataInicio(ambiente.data_inicio);
    setDataTermino(ambiente.data_termino);
    setPeriodo(ambiente.periodo);
    setSalaReservada(ambiente.sala_reservada);
    setDisciplinaProfessor(ambiente.disciplina_professor);
  };

  // 📌 Resetar formulário após envio
  const resetForm = () => {
    setEditingId(null);
    setDataInicio("");
    setDataTermino("");
    setPeriodo("M");
    setSalaReservada("1");
    setDisciplinaProfessor("");
  };

  return (
    <div className={styles.main}>
      <div className={styles.topo}>
        <Voltar />
        <h1>Gestão de Ambientes</h1>
      </div>

      {/* 📌 Exibir formulário apenas para gestores */}
      {cargoUsuario === "gestor" && (
        <form onSubmit={handleSubmit} className={styles.container}>
          <input type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} required />
          <input type="date" value={dataTermino} onChange={(e) => setDataTermino(e.target.value)} required />

          {/* Select para período */}
          <select value={periodo} onChange={(e) => setPeriodo(e.target.value)} required>
            <option value="M">Manhã</option>
            <option value="T">Tarde</option>
            <option value="N">Noite</option>
          </select>

          {/* Select para sala reservada */}
          <select value={salaReservada} onChange={(e) => setSalaReservada(e.target.value)} required>
            <option value="1">Sala 1</option>
            <option value="2">Sala 2</option>
            <option value="3">Sala 3</option>
            <option value="4">Sala 4</option>
            <option value="5">Sala 5</option>
          </select>

          {/* Select para disciplina */}
          <select value={disciplinaProfessor} onChange={(e) => setDisciplinaProfessor(e.target.value)} required>
            <option value="">Selecione uma disciplina</option>
            {disciplinas.map((disciplina) => (
              <option key={disciplina.id} value={disciplina.id}>
                {disciplina.nome} - {disciplina.curso}
              </option>
            ))}
          </select>

          <button type="submit">{editingId ? "Atualizar" : "Reservar Ambiente"}</button>
        </form>
      )}

      {/* 📌 Lista de ambientes */}
      <ul className={styles.lista}>
        {ambientes.map((ambiente) => (
          <li key={ambiente.id} className={styles.itensLista}>
            <div className={styles.textos}>
              <strong>{ambiente.sala_reservada}</strong> - {ambiente.periodo}
              <br />
              📚 Disciplina: {ambiente.disciplina_nome}
              <br />
              🗓 {new Date(ambiente.data_inicio).toLocaleDateString()} - {new Date(ambiente.data_termino).toLocaleDateString()}
              <br />
            </div>
            {/* 📌 Exibir botões de editar/excluir apenas para gestores */}
            {cargoUsuario === "gestor" && (
              <>
                <button className={styles.editar} onClick={() => handleEdit(ambiente)}>Editar</button>
                <button className={styles.excluir} onClick={() => handleDelete(ambiente.id)}>Excluir</button>
              </>
            )}
          </li>
        ))}
      </ul>

    </div>
  );
}

export default GestaoAmbientes;
