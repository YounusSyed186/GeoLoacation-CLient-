"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const nav = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.BASEBACKEND_URL}/api/auth/register`,
        form
      );
      alert("Registered successfully!");
      nav.push("/login");
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-4">
      <h2 className="text-2xl font-bold">Register</h2>
      <input
        className="w-full p-2 border"
        name="username"
        placeholder="Username"
        onChange={handleChange}
        required
      />
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
      <button className="w-full bg-blue-600 text-white p-2">Register</button>
    </form>
  );
}
