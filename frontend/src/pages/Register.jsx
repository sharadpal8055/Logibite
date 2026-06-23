import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import AuthLayout from "../components/layout/AuthLayout";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

import { registerUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const passwordStrength = () => {
    const p = form.password;

    if (p.length < 6)
      return {
        text: "Weak",
        color: "bg-red-500",
        width: "w-1/3",
      };

    if (p.length < 10)
      return {
        text: "Medium",
        color: "bg-yellow-500",
        width: "w-2/3",
      };

    return {
      text: "Strong",
      color: "bg-green-500",
      width: "w-full",
    };
  };

  const strength =
    passwordStrength();

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.email ||
      !form.password
    ) {
      return toast.error(
        "Please fill all fields."
      );
    }

    if (
      form.password !==
      form.confirmPassword
    ) {
      return toast.error(
        "Passwords do not match."
      );
    }

    try {
      setLoading(true);

      const res =
        await registerUser({
          name: form.name,
          email: form.email,
          password: form.password,
        });

      login(
        res.data.user,
        res.data.token
      );

      toast.success(
        "Welcome to LogiBite!"
      );

      navigate("/");
    } catch (err) {
      toast.error(
        err.response?.data
          ?.message ||
          "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join LogiBite today"
      footerText="Already have an account?"
      footerLink="/login"
      footerLinkText="Login"
    >
      <form
        onSubmit={handleSubmit}
      >
        <Input
          label="Full Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />

        <Input
          label="Email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />

        <Input
          label="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />

        <div className="mb-5">

          <div className="h-2 rounded-full bg-gray-200">

            <div
              className={`h-2 rounded-full ${strength.color} ${strength.width}`}
            />

          </div>

          <p className="text-sm mt-2 text-gray-500">

            Password Strength :
            {" "}
            {strength.text}

          </p>

        </div>

        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={
            form.confirmPassword
          }
          onChange={handleChange}
        />

        {form.confirmPassword &&
          form.password !==
            form.confirmPassword && (
            <p className="text-red-500 text-sm mb-4">
              Passwords don't
              match
            </p>
          )}

        <Button
          type="submit"
          loading={loading}
        >
          Create Account
        </Button>
      </form>
    </AuthLayout>
  );
}

export default Register;