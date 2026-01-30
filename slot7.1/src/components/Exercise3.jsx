import { useReducer } from "react";

const initialForm = { name: "", price: "", category: "" };
const initialErrors = { name: "", price: "", category: "" };

function validateField(field, value) {
  const v = String(value ?? "").trim();

  switch (field) {
    case "name":
      if (!v) return "Tên sản phẩm không được để trống";
      if (v.length < 3) return "Tên sản phẩm phải ít nhất 3 ký tự";
      return "";

    case "price": {
      if (v === "") return "Giá không được để trống";
      const num = Number(v);
      if (Number.isNaN(num)) return "Giá phải là số";
      if (num <= 0) return "Giá phải lớn hơn 0";
      return "";
    }

    case "category":
      if (!v) return "Vui lòng chọn danh mục";
      return "";

    default:
      return "";
  }
}

function validateAll(form) {
  return {
    name: validateField("name", form.name),
    price: validateField("price", form.price),
    category: validateField("category", form.category),
  };
}

function hasErrors(errors) {
  return Object.values(errors).some((msg) => msg);
}

function reducer(state, action) {
  switch (action.type) {
    case "CHANGE_INPUT": {
      const nextForm = { ...state.form, [action.field]: action.value };
      // validate theo field khi người dùng gõ/chọn
      const nextErrors = {
        ...state.errors,
        [action.field]: validateField(action.field, action.value),
      };
      return { ...state, form: nextForm, errors: nextErrors };
    }

    case "SET_ERRORS":
      return { ...state, errors: action.errors };

    case "RESET_FORM":
      return { form: initialForm, errors: initialErrors };

    default:
      return state;
  }
}

const Exercise3 = () => {
  const [state, dispatch] = useReducer(reducer, {
    form: initialForm,
    errors: initialErrors,
  });

  const { form, errors } = state;

  const handleSubmit = (e) => {
    e.preventDefault();

    // validate toàn bộ trước khi submit
    const nextErrors = validateAll(form);
    dispatch({ type: "SET_ERRORS", errors: nextErrors });

    if (hasErrors(nextErrors)) return;

    window.alert(
      `Đã lưu: ${form.name} - ${form.price} - ${form.category}`
    );
    dispatch({ type: "RESET_FORM" });
  };

  return (
    <section className="exercise">
      <h2>Form Quản lý Sản phẩm</h2>

      <form className="product-form" onSubmit={handleSubmit} noValidate>
        <label>
          Tên sản phẩm
          <input
            value={form.name}
            onChange={(e) =>
              dispatch({
                type: "CHANGE_INPUT",
                field: "name",
                value: e.target.value,
              })
            }
            placeholder="VD: Tai nghe"
          />
          {errors.name && <small className="field-error">{errors.name}</small>}
        </label>

        <label>
          Giá
          <input
            type="number"
            min="0"
            value={form.price}
            onChange={(e) =>
              dispatch({
                type: "CHANGE_INPUT",
                field: "price",
                value: e.target.value,
              })
            }
            placeholder="VD: 1500000"
          />
          {errors.price && (
            <small className="field-error">{errors.price}</small>
          )}
        </label>

        <label>
          Danh mục
          <select
            value={form.category}
            onChange={(e) =>
              dispatch({
                type: "CHANGE_INPUT",
                field: "category",
                value: e.target.value,
              })
            }
          >
            <option value="">-- Chọn danh mục --</option>
            <option value="Điện thoại">Điện thoại</option>
            <option value="Phụ kiện">Phụ kiện</option>
            <option value="Laptop">Laptop</option>
            <option value="Khác">Khác</option>
          </select>
          {errors.category && (
            <small className="field-error">{errors.category}</small>
          )}
        </label>

        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button type="submit" className="primary">
            Lưu
          </button>
          <button
            type="button"
            className="secondary"
            onClick={() => dispatch({ type: "RESET_FORM" })}
          >
            Reset
          </button>
        </div>
      </form>

      <div className="form-preview">
        <h3>Xem trước dữ liệu</h3>
        <ul>
          <li>Tên sản phẩm: {form.name || "Chưa có"}</li>
          <li>Giá: {form.price ? `${form.price} VND` : "Chưa thiết lập"}</li>
          <li>Danh mục: {form.category || "Chưa chọn"}</li>
        </ul>
      </div>
    </section>
  );
};

export default Exercise3;
