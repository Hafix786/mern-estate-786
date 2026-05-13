import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="p-3 mx-auto w-full max-w-lg">
      <h1 className="text-3xl text-center font-semibold my-7">SignUp</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          name="username"
          id="username"
          placeholder="username"
          className="border p-3 rounded-lg bg-slate-100"
        />
        <input
          type="text"
          name="email"
          id="email"
          placeholder="email"
          className="border p-3 rounded-lg bg-slate-100"
        />
        <input
          type="text"
          name="password"
          id="password"
          placeholder="password"
          className="border p-3 rounded-lg bg-slate-100"
        />
        <button className="uppercase text-white font-semibold p-3 rounded-lg bg-slate-700 hover:opacity-90 disabled:opacity-75 cursor-pointer">
          Sign Up
        </button>
      </form>
      <p className="mt-3 ">
        Have an Account?
        <Link to={'/sign-in'}>
          <span className="mx-0.5 text-blue-700">Sign In</span>
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
