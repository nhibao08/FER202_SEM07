import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import "./AboutUs.css";

function AboutUs() {
  return (
    <div className="about-page">
      {/* HERO */}
      <section className="about-hero">
        <div className="about-hero-overlay" />
        <Container className="about-hero-content">
          <h1 className="about-hero-title">About Us</h1>
          <p className="about-hero-subtitle">
            Fresh ingredients • Handcrafted dough • Baked with love
          </p>
        </Container>
      </section>

      {/* INTRO */}
      <section className="about-section">
        <Container>
          <div className="about-pill-wrap">
            <span className="about-pill">ABOUT US</span>
          </div>

          <Row className="align-items-start g-4">
            <Col lg={6}>
              <h2 className="about-title">
                Introduction To Best <span className="accent">Pizza House</span>
                !
              </h2>
              <p className="about-text">
                Pizza House brings you the comfort of classic Italian flavors
                with a modern twist. We craft our dough daily, use fresh
                toppings, and bake every pizza to golden perfection.
              </p>
              <p className="about-text">
                Whether it’s a quick lunch, a family dinner, or a late-night
                craving — we’ve got you.
              </p>

              <div className="about-cta">
                <Button variant="danger" size="lg" href="/">
                  Order Now
                </Button>
                <Button
                  variant="outline-dark"
                  size="lg"
                  className="ms-2"
                  href="/contact"
                >
                  Contact
                </Button>
              </div>
            </Col>

            <Col lg={6}>
              <Row className="g-3">
                <Col md={4}>
                  <Card className="feature-card h-100">
                    <Card.Body>
                      <div className="feature-icon">🍅</div>
                      <div className="feature-title">Fresh Ingredients</div>
                      <div className="feature-text">
                        Tomatoes, cheese, veggies — always fresh, always tasty.
                      </div>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={4}>
                  <Card className="feature-card h-100">
                    <Card.Body>
                      <div className="feature-icon">🔥</div>
                      <div className="feature-title">Perfect Bake</div>
                      <div className="feature-text">
                        Crispy crust outside, soft inside — just right.
                      </div>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={4}>
                  <Card className="feature-card h-100">
                    <Card.Body>
                      <div className="feature-icon">👨‍🍳</div>
                      <div className="feature-title">Pro Team</div>
                      <div className="feature-text">
                        Friendly chefs, consistent quality every single day.
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>

          {/* IMAGE / VIDEO BLOCK */}
          <Row className="mt-5 g-4 align-items-center">
            <Col lg={7}>
              <div className="media-card">
                <img
                  className="media-img"
                  src="https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=1400&q=80"
                  alt="Team making pizza"
                />
              </div>
            </Col>

            <Col lg={5}>
              <div className="media-card media-card-small">
                <img
                  className="media-img"
                  src="https://images.unsplash.com/photo-1520201163981-8cc95007dd2a?auto=format&fit=crop&w=1200&q=80"
                  alt="Pizza video cover"
                />
                <button
                  className="play-btn"
                  type="button"
                  aria-label="Play video"
                >
                  ▶
                </button>
              </div>

              <div className="mt-3 about-mini">
                <Badge bg="light" text="dark" className="me-2 border">
                  25–35 mins delivery
                </Badge>
                <Badge bg="light" text="dark" className="me-2 border">
                  Daily fresh dough
                </Badge>
                <Badge bg="light" text="dark" className="border">
                  Top-rated taste
                </Badge>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* TEAM */}
      <section className="team-section">
        <Container>
          <div className="text-center mb-4">
            <div className="about-pill-wrap">
              <span className="about-pill">OUR TEAM</span>
            </div>
            <h2 className="team-title">
              Team <span className="accent">Members</span>
            </h2>
            <p className="team-sub">
              A small team with big love for pizza — friendly, fast, and
              consistent.
            </p>
          </div>

          <Row className="g-4">
            {[
              {
                name: "Sonia Madison",
                role: "Founder",
                img: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=900&q=80",
              },
              {
                name: "Harry Warth",
                role: "Head Chef",
                img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
              },
              {
                name: "Jenny Hobb",
                role: "Branch Manager",
                img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80",
              },
              {
                name: "Johny Smith",
                role: "Supervisor",
                img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
              },
            ].map((m) => (
              <Col md={6} lg={3} key={m.name}>
                <Card className="team-card h-100">
                  <div className="team-img-wrap">
                    <img className="team-img" src={m.img} alt={m.name} />
                  </div>
                  <Card.Body className="text-center">
                    <div className="team-name">{m.name}</div>
                    <div className="team-role">{m.role}</div>

                    <div className="team-actions">
                      <button
                        className="social-btn"
                        type="button"
                        aria-label="facebook"
                      >
                        f
                      </button>
                      <button
                        className="social-btn"
                        type="button"
                        aria-label="twitter"
                      >
                        t
                      </button>
                      <button
                        className="social-btn"
                        type="button"
                        aria-label="instagram"
                      >
                        i
                      </button>
                    </div>
                  </Card.Body>

                  <div className="team-ribbon">
                    <div className="team-ribbon-inner">{m.role}</div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>

          <div className="text-center mt-5">
            <Button variant="danger" size="lg" href="/">
              Explore Menu
            </Button>
          </div>
        </Container>
      </section>

      {/* FOOTER STRIP */}
      <div className="about-footer-strip">
        <Container className="d-flex flex-wrap justify-content-between align-items-center gap-2">
          <div className="text-light-50">
            © {new Date().getFullYear()} Pizza House. All rights reserved.
          </div>
          <div className="text-light-50">
            Hotline: <span className="text-white">(+84) 0123 456 789</span>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default AboutUs;
