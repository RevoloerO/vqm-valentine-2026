import { useState, useEffect } from 'react';
import '../styles/DaysTogether.css';

const DaysTogether = () => {
  const [timeData, setTimeData] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    years: 0,
    months: 0,
  });

  useEffect(() => {
    const startDate = new Date('2018-07-04T00:00:00');

    const calculateTime = () => {
      const now = new Date();
      const diff = now - startDate;

      // Calculate total days
      const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      // Calculate years and months
      const years = Math.floor(totalDays / 365);
      const remainingDaysAfterYears = totalDays % 365;
      const months = Math.floor(remainingDaysAfterYears / 30);

      setTimeData({
        days: totalDays,
        hours,
        minutes,
        seconds,
        years,
        months,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  return (
    <div className="days-together">
      <div className="days-together-header">
        <span className="heart-icon">💕</span>
        <h3>Our Journey Together</h3>
        <span className="heart-icon">💕</span>
      </div>

      <div className="days-main">
        <div className="days-number">{formatNumber(timeData.days)}</div>
        <div className="days-label">Days of Love</div>
      </div>

      <div className="days-breakdown">
        <div className="time-unit">
          <span className="time-value">{timeData.years}</span>
          <span className="time-label">Years</span>
        </div>
        <div className="time-separator">•</div>
        <div className="time-unit">
          <span className="time-value">{timeData.months}</span>
          <span className="time-label">Months</span>
        </div>
        <div className="time-separator">•</div>
        <div className="time-unit">
          <span className="time-value">{timeData.days % 30}</span>
          <span className="time-label">Days</span>
        </div>
      </div>

      <div className="live-counter">
        <div className="counter-unit">
          <span className="counter-value">{String(timeData.hours).padStart(2, '0')}</span>
          <span className="counter-label">hrs</span>
        </div>
        <span className="counter-colon">:</span>
        <div className="counter-unit">
          <span className="counter-value">{String(timeData.minutes).padStart(2, '0')}</span>
          <span className="counter-label">min</span>
        </div>
        <span className="counter-colon">:</span>
        <div className="counter-unit">
          <span className="counter-value">{String(timeData.seconds).padStart(2, '0')}</span>
          <span className="counter-label">sec</span>
        </div>
      </div>

      <p className="since-date">Since July 4, 2018 💖</p>
    </div>
  );
};

export default DaysTogether;
