import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PizzaCard from "./PizzaCard";

function Menu() {
  const pizzas = [
    {
      name: "Margherita Pizza",
      price: "$24.00",
      image:
        "https://tse2.mm.bing.net/th/id/OIP.XyjjqV8wR74EnqLtQKRsNQHaEK?rs=1&pid=ImgDetMain&o=7&rm=3",
      discount: 10,
      isNew: false,
    },
    {
      name: "Mushroom Pizza",
      price: "$25.00",
      image:
        "https://tse2.mm.bing.net/th/id/OIP.XyjjqV8wR74EnqLtQKRsNQHaEK?rs=1&pid=ImgDetMain&o=7&rm=3",
      discount: 0,
      isNew: true,
    },
    {
      name: "Hawaiian Pizza",
      price: "$30.00",
      image:
        "https://tse2.mm.bing.net/th/id/OIP.XyjjqV8wR74EnqLtQKRsNQHaEK?rs=1&pid=ImgDetMain&o=7&rm=3",
      discount: 30,
      isNew: false,
    },
    {
      name: "Pesto Pizza",
      price: "$30.00",
      image:
        "https://tse2.mm.bing.net/th/id/OIP.XyjjqV8wR74EnqLtQKRsNQHaEK?rs=1&pid=ImgDetMain&o=7&rm=3",
      discount: 0,
      isNew: false,
    },
  ];

  return (
    <Container className="my-5">
      <h2 className="text-white mb-4">Our Menu</h2>

      <Row>
        {pizzas.map((pizza, index) => (
          <Col md={3} sm={6} xs={12} className="mb-4" key={index}>
            <PizzaCard {...pizza} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Menu;
