// RainAnimationForm.jsx
import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import ScrollTrigger from "gsap/ScrollTrigger";


import './StarsAnimation.css'; // تأكد من إضافة ملف CSS الخاص بك

const StarsAnimation = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    university: '',
    faculty: '',
    academicYear: '',
    handle: '',
    nationalId: ''
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const inputs = document.querySelectorAll(".animated-input");
    const button = document.querySelector(".animated-button");
    const header = document.querySelector(".animated-header");

    gsap.fromTo(
      inputs,
      { y: -200, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power4.out",
        stagger: 0.2
      }
    );

    gsap.fromTo(
      button,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power4.out",
        delay: inputs.length * 0.2 // Delay based on number of inputs to ensure button appears after all inputs
      }
    );
    gsap.fromTo(
      header,
      { y: -200, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power4.out",
        stagger: 0.2
      }
    );

  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const generateRandomCode = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  useEffect(() => {
    const createRainDrop = () => {
      const rainDrop = document.createElement('div');
      rainDrop.className = 'rain-drop';
      rainDrop.innerText = generateRandomCode(8); // كود عشوائي مكون من 8 أحرف

      // تحديد موقع البداية (بالأعلى بشكل عشوائي)
      rainDrop.style.left = Math.random() * 100 + 'vw'; // موضع أفقي عشوائي
      document.body.appendChild(rainDrop);

      // تحريك العنصر لأسفل باستخدام GSAP
      gsap.to(rainDrop, {
        y: window.innerHeight + 100, // النزول لأسفل
        duration: Math.random() * 2 + 3, // مدة الحركة بين 3 و 5 ثواني
        ease: 'linear',
        onComplete: () => {
          rainDrop.remove(); // إزالة العنصر بعد الانتهاء من الحركة
        },
      });
    };

    // إنشاء الأمطار بشكل متكرر
    const interval = setInterval(createRainDrop, 300); // كل 300 مللي ثانية

    return () => clearInterval(interval); // تنظيف عند الخروج
  }, []);

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <h1>Code Storm Competition Registration</h1>
        <form onSubmit={handleSubmit} className="competition-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
              placeholder="Enter your full name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="university">University</label>
            <input 
              type="text" 
              id="university" 
              name="university" 
              value={formData.university} 
              onChange={handleChange} 
              required 
              placeholder="Enter your university"
            />
          </div>
          <div className="form-group">
            <label htmlFor="faculty">Faculty</label>
            <input 
              type="text" 
              id="faculty" 
              name="faculty" 
              value={formData.faculty} 
              onChange={handleChange} 
              required 
              placeholder="Enter your faculty"
            />
          </div>
          <div className="form-group">
            <label htmlFor="academicYear">Academic Year</label>
            <input 
              type="text" 
              id="academicYear" 
              name="academicYear" 
              value={formData.academicYear} 
              onChange={handleChange} 
              required 
              placeholder="Enter your academic year"
            />
          </div>
          <div className="form-group">
            <label htmlFor="handle">Handle</label>
            <input 
              type="text" 
              id="handle" 
              name="handle" 
              value={formData.handle} 
              onChange={handleChange} 
              required 
              placeholder="Enter your coding handle"
            />
          </div>
          <div className="form-group">
            <label htmlFor="nationalId">National ID</label>
            <input 
              type="text" 
              id="nationalId" 
              name="nationalId" 
              value={formData.nationalId} 
              onChange={handleChange} 
              required 
              placeholder="Enter your National ID"
            />
          </div>
          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default StarsAnimation;
