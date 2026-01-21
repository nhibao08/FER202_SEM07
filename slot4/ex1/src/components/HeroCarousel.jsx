import Carousel from "react-bootstrap/Carousel";
import pizzaNapolitaine from "../img/pizza-napolitaine.jpg";
import vegetables from "../img/vegetables.jpg";
import pizzahouse from "../img/pizzahouse.jpg";

function HeroCarousel() {
  return (
    <Carousel fade>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={pizzaNapolitaine}
          alt="Neapolitan Pizza"
          style={{ height: "420px", objectFit: "cover" }}
        />
        <Carousel.Caption className="bg-dark bg-opacity-50 rounded p-3">
          <h3>Neapolitan Pizza</h3>
          <p>
            If you are looking for traditional Italian pizza, this is the best
            option!
          </p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src={pizzahouse}
          alt="Fresh Vegetables"
          style={{ height: "420px", objectFit: "cover" }}
        />
        <Carousel.Caption className="bg-dark bg-opacity-50 rounded p-3">
          <h3>Fresh Ingredients</h3>
          <p>High quality cheese & fresh vegetables</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src={vegetables}
          alt="Fresh Vegetables"
          style={{ height: "420px", objectFit: "cover" }}
        />
        <Carousel.Caption className="bg-dark bg-opacity-50 rounded p-3">
          <h3>Pizza House</h3>
          <p>Hot & delicious pizza every day</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default HeroCarousel;
