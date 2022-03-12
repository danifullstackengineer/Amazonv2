import $ from "jquery";

const registerQuery = async (
  email: string,
  password: string
): Promise<{ success: boolean; message: string }> => {
  var result = { success: false, message: "" };

  await $.ajax({
    type: "POST",
    url: "/register",
    data: { email: email, password: password },
  }).done((res) => {
    if (!res.success) {
      alert(res.message);
    } else {
      result = res;
      alert(res.message);
    }
  });
  return result;
};

const loginQuery = async (
  email: string,
  password: string
): Promise<{ success: boolean; message: string; token?: string }> => {
  var result = { success: false, message: "" };

  await $.ajax({
    type: "POST",
    url: "/login",
    data: { email: email, password: password },
  }).done((res) => {
    result = res;
  });
  return result;
};

const authJWT = async (): Promise<{ success: boolean; message: string }> => {
  var result = { success: false, message: "" };
  await $.ajax({
    type: "GET",
    url: "/isUserAuth",
    headers: {
      "x-access-token": localStorage.getItem("token"),
    },
  }).done((res) => {
    result = res;
  });
  return result;
};

const getUserEmail = async (
  id: string
): Promise<{ success: boolean; message:string; email?: string }> => {
  var result = { success: false, message: "" };

  await $.ajax({
    type: "POST",
    url: "/getUserInfo",
    data: { id: id },
  }).done((res) => {
    result = res
  });
  return result;
};

export { registerQuery, loginQuery, authJWT, getUserEmail };
