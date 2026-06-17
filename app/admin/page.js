"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [contacts, setContacts] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [projects, setProjects] = useState([]);

const [authorized, setAuthorized] =
  useState(false);

  useEffect(() => {
const loggedIn =
  localStorage.getItem(
    "adminLoggedIn"
  );

if (!loggedIn) {
  window.location.href =
    "/login";
  return;
}

setAuthorized(true);
    fetch("/api/contacts")
      .then((res) => res.json())
      .then((data) => setContacts(data));

    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

async function addProject(e) {
  e.preventDefault();

  await fetch("/api/projects", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      category,
      image_url: imageUrl,
    }),
  });

  alert("Project Added!");

  setTitle("");
  setCategory("");
  setImageUrl("");
}
async function deleteProject(id) {
  await fetch("/api/projects", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  setProjects(
    projects.filter(
      (project) => project.id !== id
    )
  );
}
if (!authorized) {
  return <p>Loading...</p>;
}

  return (
  <main style={{ padding: "40px" }}>
    <h1>Admin Panel</h1>

    <h2>Add Project</h2>

    <form onSubmit={addProject}>
      <input
        placeholder="Project Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br />
      <br />

      <input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <br />
      <br />

      <input
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />

      <br />
      <br />

      <button type="submit">
        Add Project
      </button>
    </form>
<h2>Projects</h2>

{projects.map((project) => (
  <div
    key={project.id}
    style={{
      border: "1px solid gray",
      padding: "10px",
      margin: "10px 0",
    }}
  >
    <h3>{project.title}</h3>

    <p>{project.category}</p>

    <button
      onClick={() =>
        deleteProject(project.id)
      }
    >
      Delete
    </button>
  </div>
))}

    <hr />

    <h2>Contact Submissions</h2>

    {contacts.map((contact) => (
      <div
        key={contact.id}
        style={{
          border: "1px solid gray",
          padding: "10px",
          margin: "10px 0",
        }}
      >
        <h3>{contact.name}</h3>

        <p>{contact.email}</p>

        <p>{contact.message}</p>
      </div>
    ))}
  </main>
);
}
