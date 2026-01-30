import { useReducer, useState } from "react";

const buildId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      return [...state, { id: buildId(), text: action.text }];

    case "DELETE_TASK":
      return state.filter((t) => t.id !== action.id);

    default:
      return state;
  }
}

const validateTask = (value) => {
  const v = value.trim();
  if (!v) return "Nội dung công việc không được để trống";
  if (v.length < 3) return "Nội dung phải ít nhất 3 ký tự";
  return "";
};

const Exercise4 = () => {
  const [task, setTask] = useState("");
  const [error, setError] = useState("");
  const [todos, dispatch] = useReducer(reducer, []);

  const handleChange = (e) => {
    const val = e.target.value;
    setTask(val);

    // validate realtime để mất lỗi khi gõ đúng
    setError(validateTask(val));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const err = validateTask(task);
    setError(err);
    if (err) return;

    dispatch({ type: "ADD_TASK", text: task.trim() });
    setTask("");
    setError("");
  };

  return (
    <section className="exercise">
      <h2>Todo List</h2>
      <p className="exercise-description">Thêm công việc mới và xóa chúng khi hoàn thành.</p>

      <form className="todo-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={task}
          onChange={handleChange}
          placeholder="Nhập công việc mới"
          aria-label="Nội dung công việc"
          className={error ? "input-error" : ""}
        />
        <button type="submit" className="primary">
          Thêm
        </button>
      </form>

      {error && <small className="field-error">{error}</small>}

      <ul className="todo-list" style={{ marginTop: "1rem" }}>
        {todos.length === 0 ? (
          <li className="empty">Chưa có công việc nào.</li>
        ) : (
          todos.map((t) => (
            <li key={t.id}>
              <span>{t.text}</span>
              <button
                type="button"
                className="danger"
                onClick={() => dispatch({ type: "DELETE_TASK", id: t.id })}
              >
                Xóa
              </button>
            </li>
          ))
        )}
      </ul>
    </section>
  );
};

export default Exercise4;
