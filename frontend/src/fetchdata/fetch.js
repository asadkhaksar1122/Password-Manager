let baseurl = "http://localhost:3000/api/";
const Loginfetch = async (email, password) => {
  const response = await fetch(`${baseurl}login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const data = await response.json();
  return data;
};
const signupfetch = async (name, email, password) => {
  const response = await fetch(`${baseurl}signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });
  const data = await response.json();
  return data;
};
const addpaswordfetch = async (token, websiteurl, username, password) => {
  const response = await fetch(`${baseurl}newpassword`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token,
      username,
      websiteurl,
      password,
    }),
  });
  const data = await response.json();
  return data;
};
const deletepasswordfetch = async (token, id) => {
  const response = await fetch(`${baseurl}deletepassword/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token,
    }),
  });
  const data = await response.json();
  return data;
};
const fetchonepassword = async (token, id) => {
  try {
    const response = await fetch(`${baseurl}editpassword/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return { errorname: error.message };
  }
};
let secretkeyfetch = async (token, secretkey) => {
  const response = await fetch(`${baseurl}secretkey`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token,
      secretkey,
    }),
  });
  const data = await response.json();
  return data;
};
let allpasswordfetch = async (token, websiteurl, username, password) => {
  const response = await fetch(`${baseurl}allpassword`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token,
      username,
      password,
      websiteurl,
    }),
  });
  const data = await response.json();
  return data;
};
let updatepassword = async (token, id, websiteurl, username, password) => {
  const response = await fetch(`${baseurl}editpassword/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token,
      username,
      password,
      websiteurl,
    }),
  });
  const data = await response.json();
  return data;
};

export {
  Loginfetch,
  secretkeyfetch,
  signupfetch,
  allpasswordfetch,
  addpaswordfetch,
  deletepasswordfetch,
  fetchonepassword,
  updatepassword,
};
