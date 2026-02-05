import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router";

function Register() {
  const { createUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleRegistration = (data) => {
    const { name, email, password } = data;
    const imageFile = data.photo[0];
    createUser(email, password, name, imageFile)
      .then((result) => {
        const createdUser = result;
        console.log("User created:", createdUser);
        navigate(location.state?.from?.pathname || "/");
      })
      .catch((error) => {
        console.error("Error during registration:", error);
      });
  };

  return (
    <div className="card-body">
      <form onSubmit={handleSubmit(handleRegistration)}>
        <fieldset className="fieldset">
          <label className="label">Name</label>
          <input
            {...register("name", { required: true })}
            type="text"
            className="input"
            placeholder="Your Name"
          />
          {errors.name && (
            <b className="error text-[#ff0000]">*This field is required*</b>
          )}
          <label className="label">Photo</label>
          <input
            {...register("photo", { required: true })}
            type="file"
            className="file-input"
            placeholder="Your Photo"
          />
          {errors.photo && (
            <b className="error text-[#ff0000]">*This field is required*</b>
          )}
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
          {errors.password?.type === "maxLength" && (
            <b className="error text-[#ff0000]">
              *Password must be less than 20 characters*
            </b>
          )}
          {errors.password?.type === "pattern" && (
            <b className="error text-[#ff0000]">
              *Password must have one uppercase letter, one number and one
              special character*
            </b>
          )}
          <div>
            <Link to="/forgot-password" className="link link-hover">
              Forgot password?
            </Link>
          </div>
          <button type="submit" className="btn btn-neutral mt-4">
            Register
          </button>
          <span className="text-sm mt-2">
            already have an account?
            <Link
              state={location.state}
              to="/login"
              className="link link-hover text-blue-500"
            >
              <b> Login</b>
            </Link>
          </span>
        </fieldset>
      </form>
    </div>
  );
}

export default Register;
