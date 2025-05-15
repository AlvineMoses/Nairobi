
const Home = () => {
  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="container">
          <h1>Welcome to Nairobi</h1>
          <p>
            Discover the vibrant heart of Kenya with our exclusive tours and
            experiences.
          </p>
          <button className="primary-btn">Explore Now</button>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <h2>Our Services</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>City Tours</h3>
              <p>Guided tours through Nairobi's most iconic landmarks.</p>
            </div>
            <div className="feature-card">
              <h3>Safari Adventures</h3>
              <p>Experience wildlife in their natural habitat.</p>
            </div>
            <div className="feature-card">
              <h3>Cultural Experiences</h3>
              <p>Immerse yourself in local Kenyan traditions and customs.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="container">
          <h2>What Our Visitors Say</h2>
          <div className="testimonials-container">
            <div className="testimonial">
              <p>"An unforgettable journey through Nairobi's wonders."</p>
              <h4>- Sarah Johnson</h4>
            </div>
            <div className="testimonial">
              <p>"The safari experience exceeded all my expectations!"</p>
              <h4>- Michael Chen</h4>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
