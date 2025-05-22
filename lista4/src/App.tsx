import { useState, useRef, useEffect } from "react"


import "./App.css"

const App = () => {

  const [input, setInput] = useState("");

  const [list, setList] = useState<string[]>([]);

  const [editList, setEditList] = useState({
    enabled: false,
    item: ""
  });

  // ----------------------

  const inputRef = useRef<HTMLInputElement>(null);

  const firstRender = useRef(true);

  // ----------------------
  useEffect(() => {
    const savedTasks = localStorage.getItem("lista");

    if(savedTasks) {
      setList(JSON.parse(savedTasks));
      console.log("Dados carregados na primeira renderização")
    };

  }, [])
  
  useEffect(() => {

    if(firstRender.current) {
      firstRender.current = false;
      return;
    };

    localStorage.setItem("lista", JSON.stringify(list));
    console.log("Dados setados ao atualizar a lista")
  }, [list]);


  // ----------------------
  const handleList = (input: string) => {
    if (editList.enabled) {
      handleSaveEdit();
      return;
    };

    setList(previous => ([...previous, input]));
    setInput("");
  };

  const handleDelete = (task: string) => {
    const removedTask = list.filter((item) => item !== task);

    setList(removedTask);
    setInput("");
  };

  const handleEdit = (task: string) => {
    inputRef.current?.focus();

    setInput(task);

    setEditList({
      enabled: true,
      item: task
    });
  };

  const handleSaveEdit = () => {
    const findIndexTask = list.findIndex((item) => item === editList.item);
    const allTasks = [...list];
    allTasks[findIndexTask] = input;

    setList(allTasks);

    setEditList({
      enabled: false,
      item: ""
    });

    setInput("");
  }
  // ----------------------

  return (
    <div className="App">
      <h1>Lista de Tarefas</h1>
      <div className="actions-container">
        <label >Informe a tarefa</label>
        <input
          type="text"
          placeholder="Digite a tarefa"
          value={input}
          onChange={e => setInput(e.target.value)}
          ref={inputRef}
        />
        <button onClick={() => handleList(input)}>
          {editList.enabled ? "Salvar Seleção" : "Adicionar Tarefa"}
        </button>
      </div>
      <div className="tasks-container">
        <ul>
          {list.map((task) => (
            <li key={task}>
              <span>{task}</span>
              <div className="btn-container">
                <button onClick={() => handleEdit(task)}>Editar</button>
                <button onClick={() => handleDelete(task)}>Excluir</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App