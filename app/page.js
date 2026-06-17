"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); 
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => setServices(data));

    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data));

    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => setStats(data));
  }, []);

async function handleSubmit(e) {
  e.preventDefault();

  if (!name || !email || !message) {
    alert("Please fill all fields");
    return;
  }

  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      message,
    }),
  });

  const data = await response.json();

  alert("Message submitted successfully!");

  setName("");
  setEmail("");
  setMessage("");
}

  return (
    <main style={{ padding: "40px" }}>
<nav
  style={{
    display: "flex",
    justifyContent: "space-between",
    padding: "20px",
    borderBottom: "1px solid gray",
  }}
>
  <h2>Nova Studio</h2>

  <div>
    <a href="#services">Services</a>
    {" | "}
    <a href="#portfolio">Portfolio</a>
    {" | "}
    <a href="#contact">Contact</a>
  </div>
</nav>
        <section
  style={{
    textAlign: "center",
    padding: "100px 20px",
  }}
>
  <h1
    style={{
      fontSize: "60px",
    }}
  >
    Nova Studio
  </h1>

  <h2
  style={{
    fontSize: "20px",
    color: "#555",
  }}
>
We Build Modern Digital Experiences
</h2>
  
<p
  style={{
    fontSize: "20px",
    color: "#555",
  }}
>
  Helping startups and businesses build
  beautiful digital products.
</p>

  <a href="#contact">
  <button
    style={{
      padding: "15px 30px",
      fontSize: "18px",
      cursor: "pointer",
    }}
  >
    Start a Project
  </button>
</a>
</section>
        <section id="services">
          <h2>Our Services</h2>

        {services.map((service) => (
          <div
            key={service.id}
            style={{
  	      border: "1px solid #ddd",
  	      padding: "25px",
  	      margin: "20px 0",
 	      borderRadius: "15px",
 	      boxShadow:
                "0px 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            <h3>{service.title}</h3>

            <p>{service.description}</p>
          </div>
        ))}
      </section>

       <hr style={{ margin: "40px 0" }} />

    
      <section id="portfolio">
  <h2>Our Portfolio</h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit, minmax(350px, 1fr))",
      gap: "20px",
    }}
  >
    {projects.map((project) => (
      <div
        key={project.id}
        style={{
          border: "1px solid gray",
          padding: "15px",
          borderRadius: "10px",
        }}
      >
        <h3>{project.title}</h3>

        <p>{project.category}</p>

        <img
          src={project.image_url}
          alt={project.title}
          width="300"
        />
      </div>
    ))}
  </div>
</section>
      
 
    <hr style={{ margin: "40px 0" }} />

<section>
  <h2>Our Statistics</h2>

  <div
    style={{
      display: "flex",
      justifyContent: "space-around",
      flexWrap: "wrap",
      marginTop: "20px",
    }}
  >
    {stats.map((stat) => (
      <div
        key={stat.id}
        style={{
          border: "1px solid gray",
          padding: "20px",
          borderRadius: "10px",
          minWidth: "150px",
          textAlign: "center",
        }}
      >
        <h3>{stat.value}+</h3>
        <p>{stat.label}</p>
      </div>
    ))}
  </div>
</section>

<hr style={{ margin: "40px 0" }} />

<section id="contact">
  <h2>Contact Us</h2>

  <form onSubmit={handleSubmit}>
    <div>
      <input
        type="text"
        style={{
 	  width: "500px",
 	  padding: "10px",
	}}
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>

    <br />

    <div>
      <input
        type="email"
        style={{
  	  width: "300px",
 	  padding: "10px",
        }}
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>

    <br />

    <div>
      <textarea
      style={{
 	 width: "300px",
         height: "100px",
         padding: "10px",	
      }}
        placeholder="Your Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
    </div>

    <br />

    <button
  type="submit"
  style={{
    padding: "15px 30px",
    fontSize: "18px",
    cursor: "pointer",
    borderRadius: "8px",
  }}
>
  Submit
</button>
  </form>
</section>

<hr />

<footer
  style={{
    textAlign: "center",
    padding: "20px",
  }}
>
  <h3>Nova Studio</h3>

  <p>Email: hello@novastudio.com</p>

  <p>Phone: +91 9876543210</p>

  <p>© 2026 Nova Studio</p>
</footer>
    
    </main>
  );
}
