function validatePassword(password) {
  // Enforce password complexity requirements and length
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{10,}$/;
  return regex.test(password);
}

export default validatePassword;
