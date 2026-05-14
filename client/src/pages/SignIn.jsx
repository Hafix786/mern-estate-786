import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null)
      navigate('/')
    } catch (error) {
      setLoading(false)
      setError(error.message) 
    }
  };

  return (
    <div className="p-3 mx-auto w-full max-w-lg">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="email"
          className="border p-3 rounded-lg bg-slate-100"
          onChange={handleChange}
        />
        <input
          type="text"
          name="password"
          id="password"
          placeholder="password"
          className="border p-3 rounded-lg bg-slate-100"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="uppercase text-white font-semibold p-3 rounded-lg bg-slate-700 hover:opacity-90 disabled:opacity-75 cursor-pointer"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
      <p className="mt-3 ">
        Dont have an Account?
        <Link to={"/sign-up"}>
          <span className="mx-0.5 text-blue-700">Sign Up</span>
        </Link>
      </p>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
};

export default SignIn;
