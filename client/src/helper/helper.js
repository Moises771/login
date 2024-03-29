import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

/**Make API request */

/**Authenticace option  */

export async function authenticace(username) {
  try {
    return await axios.post("/api/authenticate", { username });
  } catch (error) {
    return { error: "Username doesn't not exist!" };
  }
}

/**Get user details */

export async function getUser({ username }) {
  try {
    const { data } = await axios.get(`/api/user/${username}`);
    return { data };
  } catch (error) {
    return { error: "Password doesn't match!" };
  }
}

/**Register user function */

export async function registerUser(credentials) {
  try {
    const {
      data: { msg },
      status,
    } = await axios.post("/api/register", credentials);
    let { username, email } = credentials;

    //send email

    if (status === 201) {
      await axios.post("/api/registerMail", {
        username,
        userEmail: email,
        text: msg,
      });
    }

    return Promise.resolve(msg);
  } catch (error) {
    return Promise.reject({ error });
  }
}

/**Login function */

export async function verifyPassword({ username, password }) {
  try {
    if (username) {
      const { data } = await axios.post("/api/login", { username, password });
      return Promise.resolve({ data });
    }
  } catch (error) {
    return Promise.reject({ error: "Password doesn't match!" });
  }
}

/**Update user prolife function */
export async function updateUser(response) {
  try {
    const token = await localStorage.getItem("token");
    const data = await axios.put("/api/updateuser", response, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject("The profile could not be updated!");
  }
}

/**Generate OTP */

export async function generateOTP(username) {
  try {
    const {
      data: { code },
      status,
    } = await axios.get("/api/generateOTP", { params: { username } });

    //send mail with OTP
    if (status === 201) {
      let {
        data: { email },
      } = await getUser({ username });
      let text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
      await axios.post("/api/registerMail", {
        username,
        userEmail: email,
        text,
        subeject: "Password Recovery OTP",
      });
    }

    return Promise.resolve(code);
  } catch (error) {
    return Promise.reject({ error });
  }
}

/**Verify OTP */

export async function verifyOTP({ username, code }) {
  try {
    const { data, status } = await axios.get("/api/verifyOTP", {
      params: { username, code },
    });
    return { data, status };
  } catch (error) {
    return Promise.reject(error);
  }
}

/**Reset password */
export async function resetPassword({ username, password }) {
  try {
    const { data, status } = await axios.put("/api/resetPassword", {
      username,
      password,
    });
    return Promise.resolve({ data, status });
  } catch (error) {
    return Promise.reject(error);
  }
}
