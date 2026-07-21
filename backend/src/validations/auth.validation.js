const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USERNAME_PATTERN = /^[a-z0-9_]+$/i;
const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

const registerSchema = {
  first_name: { required: true, minLength: 2, maxLength: 100 },
  last_name: { required: true, minLength: 1, maxLength: 100 },
  username: { required: true, minLength: 3, maxLength: 30, pattern: USERNAME_PATTERN },
  email: { required: true, pattern: EMAIL_PATTERN },
  password: { required: true, minLength: 8, pattern: PASSWORD_PATTERN },
};

const loginSchema = {
  email: { required: true, pattern: EMAIL_PATTERN },
  password: { required: true },
};

const hasValidLength = (value, minLength, maxLength) =>
  typeof value === 'string' && value.length >= minLength && value.length <= maxLength;

const validateRegister = (data = {}) => {
  const errors = [];
  const { first_name, last_name, username, email, password } = data;

  if (!hasValidLength(first_name, 2, 100)) errors.push({ field: 'first_name', message: 'First name must be 2 to 100 characters.' });
  if (!hasValidLength(last_name, 1, 100)) errors.push({ field: 'last_name', message: 'Last name must be 1 to 100 characters.' });
  if (!hasValidLength(username, 3, 30) || !USERNAME_PATTERN.test(username)) errors.push({ field: 'username', message: 'Username must be 3 to 30 letters, numbers, or underscores.' });
  if (typeof email !== 'string' || !EMAIL_PATTERN.test(email.trim())) errors.push({ field: 'email', message: 'A valid email is required.' });
  if (typeof password !== 'string' || !PASSWORD_PATTERN.test(password)) errors.push({ field: 'password', message: 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.' });

  return { isValid: errors.length === 0, errors };
};

const validateLogin = (data = {}) => {
  const errors = [];
  const { email, password } = data;

  if (typeof email !== 'string' || !EMAIL_PATTERN.test(email.trim())) errors.push({ field: 'email', message: 'A valid email is required.' });
  if (typeof password !== 'string' || password.length === 0) errors.push({ field: 'password', message: 'Password is required.' });

  return { isValid: errors.length === 0, errors };
};

module.exports = { registerSchema, loginSchema, validateRegister, validateLogin };
