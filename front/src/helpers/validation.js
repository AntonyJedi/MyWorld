const validation = (em, pass) => {
  const errors = {}
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g
  if (!em) {
    errors.email = "Email is required"
  } else if (!regex.test(em)) {
    errors.email = "Email is incorrect"
  }
  if (!pass) {
    errors.password = "Password is required"
  }
  return errors
}

export default validation;