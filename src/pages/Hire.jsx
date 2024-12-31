import { useState } from 'react';
import BlockRevealer from '../components/BlockRevealer/BlockRevealer';
import TiltCard from '../components/TiltCard/TiltCard';
import './Hire.css';

const Hire = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    duration: '',
    passengers: '',
    occasion: '',
    requirements: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Booking submitted:', formData);
    alert('Thank you for your booking request! We will contact you shortly.');
  };

  return (
    <div className="hire">
      <section className="hire__hero">
        <BlockRevealer>
          <h1 className="hire__title">Hire a Matatu</h1>
          <p className="hire__subtitle">Custom rides for your special occasions</p>
        </BlockRevealer>
      </section>

      <section className="hire__features">
        <div className="hire__features-grid">
          <TiltCard className="hire__feature">
            <div className="hire__feature-icon">🎉</div>
            <h3>Events & Parties</h3>
            <p>Perfect for birthdays, weddings, and corporate events</p>
          </TiltCard>
          <TiltCard className="hire__feature">
            <div className="hire__feature-icon">🎵</div>
            <h3>Custom Sound System</h3>
            <p>State-of-the-art audio equipment for your entertainment</p>
          </TiltCard>
          <TiltCard className="hire__feature">
            <div className="hire__feature-icon">🎨</div>
            <h3>Unique Designs</h3>
            <p>Choose from our collection of artistically designed matatus</p>
          </TiltCard>
        </div>
      </section>

      <section className="hire__form-section">
        <BlockRevealer>
          <h2 className="hire__form-title">Book Your Ride</h2>
        </BlockRevealer>
        <form className="hire__form" onSubmit={handleSubmit}>
          <div className="hire__form-group">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
            />
          </div>
          
          <div className="hire__form-group">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              required
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="hire__form-group">
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
            <select
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
            >
              <option value="">Select Duration</option>
              <option value="2">2 Hours</option>
              <option value="4">4 Hours</option>
              <option value="6">6 Hours</option>
              <option value="8">8 Hours</option>
              <option value="custom">Custom Duration</option>
            </select>
          </div>

          <div className="hire__form-group">
            <input
              type="number"
              name="passengers"
              value={formData.passengers}
              onChange={handleChange}
              placeholder="Number of Passengers"
              min="1"
              required
            />
            <select
              name="occasion"
              value={formData.occasion}
              onChange={handleChange}
              required
            >
              <option value="">Select Occasion</option>
              <option value="wedding">Wedding</option>
              <option value="birthday">Birthday</option>
              <option value="corporate">Corporate Event</option>
              <option value="tour">City Tour</option>
              <option value="other">Other</option>
            </select>
          </div>

          <textarea
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            placeholder="Special Requirements or Notes"
            rows="4"
          />

          <button type="submit" className="hire__submit-btn">
            Submit Booking Request
          </button>
        </form>
      </section>

      <section className="hire__verification">
        <BlockRevealer>
          <h2>Verification Process</h2>
        </BlockRevealer>
        <div className="hire__verification-steps">
          <div className="hire__step">
            <div className="hire__step-number">1</div>
            <h3>Submit Request</h3>
            <p>Fill out the booking form with your requirements</p>
          </div>
          <div className="hire__step">
            <div className="hire__step-number">2</div>
            <h3>Confirmation</h3>
            <p>Receive confirmation and price quote within 2 hours</p>
          </div>
          <div className="hire__step">
            <div className="hire__step-number">3</div>
            <h3>Payment</h3>
            <p>Secure your booking with a deposit payment</p>
          </div>
          <div className="hire__step">
            <div className="hire__step-number">4</div>
            <h3>Enjoy Your Ride</h3>
            <p>Experience the unique Matatu culture</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hire;
