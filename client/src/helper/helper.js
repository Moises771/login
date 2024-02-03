import axios from "axios";

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
