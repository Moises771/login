import toast from "react-hot-toast";

/**Validate login page username */

export async function usernameValidate(values) {
  const errors = usernameVerify({}, values);

  return errors;
}

/**Validate username */
function usernameVerify(error = {}, values) {
  if (!values.username) {
    error.username = toast.error("Username required!");
  } else if (values.username.includes(" ")) {
    error.username = toast.error("Invalid username");
  }

  return error;
}
