import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import { IconButton } from "@mui/material";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import { Edit as EditIcon } from "@mui/icons-material";
import CheckIcon from "@mui/icons-material/Check";

/* 
  input {
    label: "Chau",
    description: "a"
  }

  target {
    label: "Hola",
    ...,
    ...
  }

  for(let key in input) {
    // key label
    target["label"] = input["label"]
  }
*/

const TaskItem = ({ task, onDelete, onChange, select, onToggleSelect }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const [state, setState] = useState({ ...task });

  const _handleChange = ({ target: { name, value } }) => {
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const _handleClickEditMode = () => setIsEditMode(true);

  const _handleSubmitChange = () => {
    onChange(state);
    setIsEditMode(false);
  };

  return (
    <ListItem
      key={task._id}
      secondaryAction={
        isEditMode ? (
          <IconButton size="small" onClick={_handleSubmitChange}>
            <CheckIcon />
          </IconButton>
        ) : (
          <>
            <IconButton size="small" onClick={_handleClickEditMode}>
              <EditIcon />
            </IconButton>
            <IconButton size="small">
              <DeleteIcon onClick={onDelete} />
            </IconButton>
          </>
        )
      }
    >
      <ListItemAvatar>
        <Checkbox checked={select} onChange={onToggleSelect} />
      </ListItemAvatar>
      <ListItemText
        primary={
          isEditMode ? (
            <TextField
              name="title"
              onChange={_handleChange}
              value={state.title}
            />
          ) : (
            task.title
          )
        }
        secondary={
          isEditMode ? (
            <TextField
              name="description"
              onChange={_handleChange}
              value={state.description}
            />
          ) : (
            task.description
          )
        }
      />
    </ListItem>
  );
};

export default TaskItem;
