import { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Stack from "react-bootstrap/Stack";
import PizzaDetailModal from "./PizzaDetailModal";

function PizzaCard({ name, price, image, discount, isNew }) {
  const [show, setShow] = useState(false);

  return (
    <>
      <Card bg="light" className="h-100 position-relative">
        {(isNew || (discount && discount > 0)) && (
          <Badge
            bg="warning"
            text="dark"
            className="position-absolute top-0 start-0 m-2"
          >
            {isNew ? "NEW" : "SALE"}
          </Badge>
        )}

        <Card.Img
          variant="top"
          src={image}
          style={{ height: "200px", objectFit: "cover" }}
        />

        <Card.Body className="d-flex flex-column">
          <Card.Title className="fs-3 text-black text-start">{name}</Card.Title>

          {discount && discount > 0 ? (
            <div className="d-flex gap-2">
              <Card.Text className="text-decoration-line-through text-muted mb-0">
                ${price}
              </Card.Text>
              <Card.Text className="text-warning fw-bold mb-0">
                ${price}
              </Card.Text>
            </div>
          ) : (
            <Card.Text className="text-black text-start mb-0">
              ${price}
            </Card.Text>
          )}

          <Stack direction="horizontal" gap={2} className="mt-auto pt-3">
            <Button variant="dark" className="flex-fill">
              Buy
            </Button>
            <Button
              variant="outline-dark"
              className="flex-fill"
              onClick={() => setShow(true)}
            >
              View Detail
            </Button>
          </Stack>
        </Card.Body>
      </Card>

      {/* Modal */}
      <PizzaDetailModal
        show={show}
        handleClose={() => setShow(false)}
        name={name}
        image={image}
        price={price}
        discount={discount}
        isNew={isNew}
      />
    </>
  );
}

export default PizzaCard;
