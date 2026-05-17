import { createClient } from "@supabase/supabase-js";
import { useDispatch } from "react-redux";
import { signInFailure } from "../app/user/userSlice";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
);

const OAuth = () => {
  const dispatch = useDispatch();

  const handleGoogleClick = async () => {
    try {
      // 1. Kick off standard Supabase OAuth handling 
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin,
          queryParams: {
            access_type: "offline",
            prompt: "select_account",
          },
        },
      });
      console.log(data);
      if (error) throw error;

    } catch (error) {
      console.error("Google Auth Execution Error:", error.message);
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="bg-red-700 text-white font-semibold uppercase p-3 rounded-lg cursor-pointer hover:opacity-85 w-full"
    >
      continue with google
    </button>
  );
};

export default OAuth;