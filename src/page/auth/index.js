import { useState } from "react";
import Swal from "sweetalert2";
import "./styles.css";

const Auth = () => {
  // States
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // Function
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      email: e.target[0].value,
      password: e.target[1].value,
    };

    fetch(`http://127.0.0.1:8000/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then(async (response) => {
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message);
        }

        const res = await response.json();
        console.log(res);
        const token = res.token;
        const user = res.user;
        const expirationTime = new Date(
          Date.now() + 2 * 60 * 60 * 1000
        ).toUTCString(); // 2 Hours
        document.cookie = `token=${token}; expires=${expirationTime}`;
        document.cookie = `name=${user.name}; expires=${expirationTime}`;
        document.cookie = `role=${user.role}; expires=${expirationTime}`;

        Swal.fire({
          title: "Auth Success",
          text: "Welcome to the system",
          icon: "success",
        });

        setTimeout(() => {
          window.location.href = "/";
        }, [2000]);
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          text: error,
          icon: "error",
        });
      });
  };

  // UseEffect

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="email"
          onChange={(e) => {
            setForm({ ...form, email: e.target.value });
          }}
        />
        <input
          placeholder="password"
          onChange={(e) => {
            setForm({ ...form, password: e.target.value });
          }}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Auth;
