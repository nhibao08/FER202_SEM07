import { useReducer, useEffect } from "react";

const initialState = {
  isShowModal: false,
  isConfirmed: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "OPEN_MODAL":
      return { ...state, isShowModal: true, isConfirmed: false };

    case "CLOSE_MODAL":
      return { ...state, isShowModal: false };

    case "CONFIRM_ORDER":
      return { ...state, isConfirmed: true, isShowModal: false };

    default:
      return state;
  }
}

const message =
  "Bạn có chắc chắn muốn duyệt đơn hàng này để chuyển sang bộ phận kho không?";

const Exercise2 = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.isConfirmed) {
      window.alert("Đơn hàng đã được duyệt thành công!");
    }
  }, [state.isConfirmed]);

  return (
    <section className="exercise">
      <h2>Modal Xác nhận đơn hàng</h2>

      <button type="button" className="primary" onClick={() => dispatch({ type: "OPEN_MODAL" })}>
        Xử lý đơn hàng
      </button>

      {state.isShowModal && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="modal-panel">
            <button
              type="button"
              className="icon-button"
              aria-label="Đóng"
              onClick={() => dispatch({ type: "CLOSE_MODAL" })}
            >
              ×
            </button>

            <h3>Xác nhận</h3>
            <p>{message}</p>

            <div className="modal-actions">
              <button type="button" className="secondary" onClick={() => dispatch({ type: "CLOSE_MODAL" })}>
                Hủy
              </button>
              <button type="button" className="primary" onClick={() => dispatch({ type: "CONFIRM_ORDER" })}>
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Exercise2;
