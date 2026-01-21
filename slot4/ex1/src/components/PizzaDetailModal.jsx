import { useMemo, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";

function PizzaDetailModal({
  show,
  handleClose,
  name,
  image,
  price,
  discount,
  isNew,
  description,
}) {
  const [size, setSize] = useState("M");
  const [crust, setCrust] = useState("Thin");
  const [qty, setQty] = useState(1);

  // price có thể là string "$24.00" hoặc number 24
  const basePrice = useMemo(() => {
    if (typeof price === "number") return price;
    const n = Number(String(price).replace(/[^0-9.]/g, ""));
    return Number.isFinite(n) ? n : 0;
  }, [price]);

  // discount giả định là % (0-100). Nếu bạn dùng kiểu khác, nói mình chỉnh.
  const finalPrice = useMemo(() => {
    if (discount && discount > 0) return basePrice * (1 - discount / 100);
    return basePrice;
  }, [basePrice, discount]);

  const total = useMemo(() => finalPrice * qty, [finalPrice, qty]);

  const pretty = (n) => `$${n.toFixed(2)}`;

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="d-flex align-items-center gap-2">
          {name}
          {isNew && <Badge bg="success">NEW</Badge>}
          {discount && discount > 0 && (
            <Badge bg="warning" text="dark">
              SALE -{discount}%
            </Badge>
          )}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="pt-3">
        <div className="row g-4">
          {/* LEFT: image */}
          <div className="col-md-6">
            <div className="rounded overflow-hidden border">
              <img
                src={image}
                alt={name}
                style={{ width: "100%", height: 320, objectFit: "cover" }}
              />
            </div>
            <div className="mt-3 d-flex gap-2 flex-wrap">
              <Badge bg="light" text="dark" className="border">
                Fresh ingredients
              </Badge>
              <Badge bg="light" text="dark" className="border">
                Oven baked
              </Badge>
              <Badge bg="light" text="dark" className="border">
                Best seller
              </Badge>
            </div>
          </div>

          {/* RIGHT: details */}
          <div className="col-md-6">
            {/* Price block */}
            <div className="p-3 rounded border bg-light">
              {discount && discount > 0 ? (
                <div className="d-flex align-items-end gap-3">
                  <div className="text-muted text-decoration-line-through fs-5">
                    {pretty(basePrice)}
                  </div>
                  <div className="text-danger fw-bold fs-3">
                    {pretty(finalPrice)}
                  </div>
                </div>
              ) : (
                <div className="fw-bold fs-3">{pretty(basePrice)}</div>
              )}

              <div className="text-muted mt-2" style={{ lineHeight: 1.6 }}>
                {description ||
                  "A delicious pizza made with fresh ingredients, baked to a golden crispy crust and topped with rich flavors."}
              </div>
            </div>

            {/* Options */}
            <div className="mt-3">
              <div className="row g-2">
                <div className="col-6">
                  <Form.Label className="fw-semibold mb-1">Size</Form.Label>
                  <Form.Select
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                  >
                    <option value="S">Small</option>
                    <option value="M">Medium</option>
                    <option value="L">Large</option>
                  </Form.Select>
                </div>

                <div className="col-6">
                  <Form.Label className="fw-semibold mb-1">Crust</Form.Label>
                  <Form.Select
                    value={crust}
                    onChange={(e) => setCrust(e.target.value)}
                  >
                    <option value="Thin">Thin</option>
                    <option value="Classic">Classic</option>
                    <option value="Cheese Burst">Cheese Burst</option>
                  </Form.Select>
                </div>

                <div className="col-6">
                  <Form.Label className="fw-semibold mb-1">Quantity</Form.Label>
                  <div className="d-flex gap-2">
                    <Button
                      variant="outline-dark"
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                    >
                      -
                    </Button>
                    <Form.Control
                      value={qty}
                      readOnly
                      className="text-center"
                    />
                    <Button
                      variant="outline-dark"
                      onClick={() => setQty((q) => q + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div className="col-6">
                  <Form.Label className="fw-semibold mb-1">Summary</Form.Label>
                  <div className="p-2 rounded border bg-white">
                    <div className="small text-muted">
                      Size: <span className="text-dark">{size}</span> • Crust:{" "}
                      <span className="text-dark">{crust}</span>
                    </div>
                    <div className="fw-bold mt-1">
                      Total:{" "}
                      <span className="text-danger">{pretty(total)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Little note */}
            <div className="mt-3 small text-muted">
              * Free delivery for orders over $50. Estimated time: 25–35 mins.
            </div>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer className="border-0 pt-0">
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="dark">Buy</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PizzaDetailModal;
