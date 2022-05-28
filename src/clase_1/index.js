import Button from "@mui/material/Button";
import List from "@mui/material/List";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TaskItem from "./TaskItem";
import TextField from "@mui/material/TextField";
import { produce } from "immer";
/** 
  interface Task {
    _id: string;
    title: string;
    description: string;
    createdAt: Date;
  }

  tasks: Task[]
*/

const init_tasks = [];

export default function App() {
  const [selectItemIds, setSelectItemIds] = useState([]);
  const [state, setState] = useState({
    title: "",
    description: ""
  });

  const [tasks, setTasks] = useState(init_tasks);

  const _handleChange = ({ target: { name, value } }) => {
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const _handleSubmit = (e) => {
    e.preventDefault();
    setTasks((prev) =>
      prev.concat([
        {
          _id: uuidv4(),
          title: state.title,
          description: state.description
        }
      ])
    );
    setState({
      title: "",
      description: ""
    });
  };

  const _handleClickDeleteTask = (taskId) => () => {
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
  };

  const _handleChangeTask = (taskId) => (newTask) => {
    setTasks((prevTasks) =>
      produce(prevTasks, (draftTasks) => {
        const task = draftTasks.find((task) => task._id === taskId);

        for (let key in newTask) {
          task[key] = newTask[key];
        }
      })
    );
  };

  const _handleToggleSelect = (taskId) => () => {
    setSelectItemIds((prevSelectItemIds) =>
      produce(prevSelectItemIds, (selectItemIds) => {
        const taskIndex = selectItemIds.findIndex(
          (_taskId) => _taskId === taskId
        );
        if (taskIndex >= 0) selectItemIds.splice(taskIndex, 1);
        else {
          selectItemIds.push(taskId);
        }
      })
    );
  };

  const _handleClickClearAll = () => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => !selectItemIds.includes(task._id))
    );
    setSelectItemIds([]);
  };

  return (
    <div>
      <form onSubmit={_handleSubmit}>
        <TextField
          size="small"
          onChange={_handleChange}
          value={state.title}
          name="title"
          placeholder="Nombre de tarea"
          label="Nombre de tarea"
        />
        <TextField
          size="small"
          sx={{ ml: 1 }}
          name="description"
          onChange={_handleChange}
          value={state.description}
          placeholder="Descripcion"
          label="Descripcion"
        />

        <Button onClick={() => {}} type="submit">
          Crear tarea
        </Button>
      </form>

      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            onToggleSelect={_handleToggleSelect(task._id)}
            select={selectItemIds.includes(task._id)}
            onChange={_handleChangeTask(task._id)}
            onDelete={_handleClickDeleteTask(task._id)}
          />
        ))}
      </List>

      <Button onClick={_handleClickClearAll}>Borra todo</Button>
    </div>
  );
}
