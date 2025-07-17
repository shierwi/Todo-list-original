import React, { Fragment } from "react";

export function TodoItem({
  todo,
  cambiarEstado,
  editarTarea,
  editTaskId,
  newTask,
  setNewTask,
}) {
  const { id, task, completed } = todo;

  const fnCambiarEstado = () => {
    cambiarEstado(id);
  };

  const handleEditar = () => {
    editarTarea(id, task);
  };

  return (
    <Fragment>
      <li className="list-group-item">
        <input
          onChange={fnCambiarEstado}
          type="checkbox"
          checked={completed}
          className="me-2"
        />
        {editTaskId === id ? (
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="form-control d-inline-block w-auto"
          />
        ) : (
          task
        )}
        <button onClick={handleEditar} className="btn btn-warning ms-2">
          <i className="bi bi-pencil"></i>
        </button>
      </li>
    </Fragment>
  );
}
