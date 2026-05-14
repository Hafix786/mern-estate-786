import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
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
      const res = await fetch("/api/auth/sign-up", {
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
      navigate('/sign-in')
    } catch (error) {
      setLoading(false)
      setError(error.message) 
    }
  };

  return (
    <div className="p-3 mx-auto w-full max-w-lg">
      <h1 className="text-3xl text-center font-semibold my-7">SignUp</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="username"
          className="border p-3 rounded-lg bg-slate-100"
          onChange={handleChange}
        />
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
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>
      <p className="mt-3 ">
        Have an Account?
        <Link to={"/sign-in"}>
          <span className="mx-0.5 text-blue-700">Sign In</span>
        </Link>
      </p>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
};

export default SignUp;
