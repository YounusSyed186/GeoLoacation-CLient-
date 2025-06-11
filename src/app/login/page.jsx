"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const nav = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.BASEBACKEND_URL}/api/auth/login`,
        form
      );
      alert("Login successful");
      console.log(data);
      localStorage.setItem("token", data.token);
      // console.log(data.token);
      const userId = data.user.id;
      console.log(userId); // 👉 '68459d9cd598802bbf0a3f99'
      localStorage.setItem("User", JSON.stringify(userId));
      nav.push("/home"); // Redirect to home page after login
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-4">
      <h2 className="text-2xl font-bold">Login</h2>
      <input
        className="w-full p-2 border"
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />
      <input
        className="w-full p-2 border"
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        required
      />
      <button className="w-full bg-green-600 text-white p-2">Login</button>
    </form>
  );
}
