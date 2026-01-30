import { useReducer } from "react";

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };

    case "DECREMENT":
      return { count: Math.max(0, state.count - 1) };

    case "SET_INPUT": {
      // action.value là string từ input
      const raw = action.value;

      // cho phép xóa input => về 0 cho an toàn
      if (raw === "") return { count: 0 };

      const value = Number(raw);
      if (Number.isNaN(value)) return state; // không đổi nếu nhập bậy
      return { count: Math.max(0, value) };
    }

    default:
      return state;
  }
}

const Exercise1 = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <section className="exercise">
      <h2>Chỉnh sửa số lượng</h2>

      <div className="quantity-editor">
        <button type="button" onClick={() => dispatch({ type: "DECREMENT" })}>
          -
        </button>

        <input
          type="number"
          min="0"
          value={state.count}
          onChange={(e) =>
            dispatch({ type: "SET_INPUT", value: e.target.value })
          }
        />

        <button type="button" onClick={() => dispatch({ type: "INCREMENT" })}>
          +
        </button>
      </div>

      <p className="quantity-value">Số lượng hiện tại: {state.count}</p>
    </section>
  );
};

export default Exercise1;
