import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AuthLayout from "../../../layouts/AuthLayout";

import Card from "../../../components/common/ui/Card/Card";
import Input from "../../../components/common/ui/Input/Input";
import Button from "../../../components/common/ui/Button/Button";

import useForm from "../../../hooks/useForm";

import validateLogin from "../../../validations/login.validation";

import authService from "../../../services/auth.service";

import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../../../store/slices/authSlice";

import "./LoginPage.css";

const LoginPage = () => {
  const { values, errors, handleChange, validate } = useForm(
    {
      email: "",
      password: "",
    },
    validateLogin
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading } = useSelector((state) => state.auth);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    dispatch(loginStart());

    try {
      const {
        user,
        accessToken,
        refreshToken,
      } = await authService.login(values);

      dispatch(
        loginSuccess({
          user,
          accessToken,
          refreshToken,
        })
      );

      const selectedMood = location.state?.selectedMood;

if (selectedMood) {
  navigate(`/moods/${selectedMood}`, {
    replace: true,
  });
} else {
  navigate("/dashboard", {
    replace: true,
  });
}
    } catch (error) {
      dispatch(
        loginFailure(
          error.response?.data?.message || "Login failed."
        )
      );
    }
  };

  return (
    <AuthLayout>
      <Card>
        <div className="login-page">
          <div className="login-logo">❤️</div>

          <h1>Soul Sync</h1>

          <p>Every heartbeat has a story.</p>

          <form onSubmit={handleSubmit}>
            <Input
              label="Email Address"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={values.email}
              onChange={handleChange}
              error={errors.email}
            />

            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={values.password}
              onChange={handleChange}
              error={errors.password}
            />

            <div className="forgot-password">
              <Link to="#">Forgot Password?</Link>
            </div>

            <Button type="submit" loading={loading}>
              Login
            </Button>
          </form>

          <div className="register-link">
            Don't have an account?{" "}
            <Link to="/register">Create Account</Link>
          </div>
        </div>
      </Card>
    </AuthLayout>
  );
};

export default LoginPage;