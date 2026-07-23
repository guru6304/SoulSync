import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AuthLayout from "../../../layouts/AuthLayout";

import Card from "../../../components/common/ui/Card/Card";
import Input from "../../../components/common/ui/Input/Input";
import Button from "../../../components/common/ui/Button/Button";

import useForm from "../../../hooks/useForm";

import validateRegister from "../../../validations/register.validation";

import authService from "../../../services/auth.service";

import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../../../store/slices/authSlice";

import "./RegisterPage.css";

const RegisterPage = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.auth);

  const { values, errors, handleChange, validate } = useForm(
    {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validateRegister,
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    dispatch(loginStart());

    try {
      const response = await authService.register(values);

      const { user, accessToken, refreshToken } = response.data;

      localStorage.setItem("token", accessToken);

      localStorage.setItem("refreshToken", refreshToken);

      dispatch(
        loginSuccess({
          user,

          token: accessToken,
        }),
      );

      navigate("/");
    } catch (error) {
      dispatch(
        loginFailure(error.response?.data?.message || "Registration failed."),
      );
    }
  };

  return (
    <AuthLayout>
      <Card>
        <div className="login-page">
          <div className="login-logo">❤️</div>

          <h1>Create Account</h1>

          <p>Begin your Soul Sync journey.</p>

          <form onSubmit={handleSubmit}>
            <Input
              label="First Name"
              name="first_name"
              value={values.first_name}
              onChange={handleChange}
              error={errors.first_name}
            />

            <Input
              label="Last Name"
              name="last_name"
              value={values.last_name}
              onChange={handleChange}
              error={errors.last_name}
            />

            <Input
              label="Username"
              name="username"
              value={values.username}
              onChange={handleChange}
              error={errors.username}
            />

            <Input
              label="Email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              error={errors.email}
            />

            <Input
              label="Password"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              error={errors.password}
            />
            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={values.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
            />

            <Button type="submit" loading={loading}>
              Create Account
            </Button>
          </form>

          <div className="register-link">
            Already have an account?
            <Link to="/login">Login</Link>
          </div>
        </div>
      </Card>
    </AuthLayout>
  );
};

export default RegisterPage;
