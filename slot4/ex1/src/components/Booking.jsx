function Booking() {
  return (
    <div className="container my-5 text-white">
      <h2 className="text-center mb-4">Book Your Table</h2>

      <div className="row mb-3">
        <div className="col-md-4">
          <input className="form-control" placeholder="Your Name *" />
        </div>
        <div className="col-md-4">
          <input className="form-control" placeholder="Your Email *" />
        </div>
        <div className="col-md-4">
          <select className="form-select">
            <option>Select a Service</option>
          </select>
        </div>
      </div>

      <textarea
        className="form-control mb-3"
        rows="4"
        placeholder="Please write your comment"
      />

      <button className="btn btn-warning px-4">Send Message</button>
    </div>
  );
}

export default Booking;
