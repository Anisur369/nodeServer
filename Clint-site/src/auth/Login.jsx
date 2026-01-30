import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";

function Login() {
  const { signInUser } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleRegistration = (data) => {
    const { email, password } = data;
    signInUser(email, password)
      .then((result) => {
        const loggedInUser = result.user;
        console.log(loggedInUser);
      })
      .catch((error) => {
        console.error("Error during login:", error);
      });
  };

  return (
    <div className="card-body">
      <form onSubmit={handleSubmit(handleRegistration)}>
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input
            {...register("email", { required: true })}
            type="email"
            className="input"
            placeholder="Email"
          />
          {errors.email && (
            <b className="error text-[#ff0000]">*This field is required*</b>
          )}
          <label className="label">Password</label>
          <input
            {...register("password", {
              required: true,
              minLength: 6,
              maxLength: 20,
              pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
            })}
            type="password"
            className="input"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <b className="error text-[#ff0000]">*This field is required*</b>
          )}
          {errors.password?.type === "minLength" && (
            <b className="error text-[#ff0000]">
              *Password must be at least 6 characters*
            </b>
          )}
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4">Login</button>
          <span className="text-sm mt-2">
            Don't have an account?
            <Link to="/register" className="link link-hover text-blue-500">
              <b> Register</b>
            </Link>
          </span>
        </fieldset>
      </form>
    </div>
  );
}

export default Login;
