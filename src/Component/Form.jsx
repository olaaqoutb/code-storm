import { useState, useEffect } from "react";
import "./Form.css";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const CodeStormForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    university: "",
    faculty: "",
    academicYear: "",
    handle: "",
    favouritePlatform: "",
    nationalId: "",
  });

  const academicYearOptions = ["Prep", "1", "2", "3", "4", "5"];

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
        stagger: 0.2,
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
        delay: inputs.length * 0.2,
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
        stagger: 0.2,
      }
    );
  }, []);

  const generateRandomCode = () => {
    const codes = [
      "undefined",
      "null",
      'cout<<"Hello,world";',
      'console.log("test")',
      "return 0;",
      "<script>",
      "<html/>",
      "c++",
      "int main(){\n\nreturn 0;\n\n}",
    ];
    return codes[Math.floor(Math.random() * codes.length)];
  };

  useEffect(() => {
    const createRainDrop = () => {
      const rainDrop = document.createElement("div");
      rainDrop.className = "rain-drop";
      rainDrop.innerText = generateRandomCode();

      const leftPos = Math.random() * 60 + 10;
      rainDrop.style.left = `${leftPos}vw`;

      document.body.appendChild(rainDrop);

      gsap.to(rainDrop, {
        y: window.innerHeight * 0.8,
        duration: Math.random() * 7 + 9,
        ease: "linear",
        onComplete: () => {
          rainDrop.remove();
        },
        scrollTrigger: {
          trigger: rainDrop,
          start: "top 100%",
          end: "bottom 80%",
          toggleActions: "play none none none",
        },
      });
    };

    const interval = setInterval(createRainDrop, 600);

    return () => clearInterval(interval);
  }, []);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Name is required";
    if (!formData.email) tempErrors.email = "Email is required";
    if (!formData.university) tempErrors.university = "University is required";
    if (!formData.faculty) tempErrors.faculty = "Faculty is required";
    if (!formData.academicYear)
      tempErrors.academicYear = "Academic Year is required";
    if (!formData.handle) tempErrors.handle = "Handle is required";
    if (!formData.nationalId) tempErrors.nationalId = "National ID is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted successfully", formData);
    }
  };

  return (
    <div className="wall">
      <form onSubmit={handleSubmit} className="code-storm-form">
        <h2 className="animated-header">IEEE CodeStorm Competition</h2>
        {[
          "name",
          "email",
          "university",
          "faculty",
          "handle",
          "favouritePlatform",
          "nationalId",
        ].map((field) => (
          <div key={field} className="form-group">
            <label>
              {field.charAt(0).toUpperCase() +
                field
                  .slice(1)
                  .replace(/([A-Z])/g, " $1")
                  .trim()}
            </label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className={`animated-input ${errors[field] ? "error" : ""}`}
              placeholder={`Enter your ${field
                .replace(/([A-Z])/g, " $1")
                .toLowerCase()}`}
            />
            {errors[field] && (
              <span className="error-message">{errors[field]}</span>
            )}
          </div>
        ))}

        <div className="form-group">
          <label>Academic Year</label>
          <select
            name="academicYear"
            value={formData.academicYear}
            onChange={handleChange}
            className={`animated-input ${errors.academicYear ? "error" : ""}`}
          >
            <option value="">Select Academic Year</option>
            {academicYearOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.academicYear && (
            <span className="error-message">{errors.academicYear}</span>
          )}
        </div>

        <button type="submit" className="animated-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CodeStormForm;
