import { 
  TOKEN_NAME, USER_ROLES,
  // USER_NAME 
}from "../@constant/constant";
import jwt_decode from "jwt-decode";

const __deocde_token = (token) => {
  return jwt_decode(token);
};

const get_token = () => {
  if (localStorage.getItem(TOKEN_NAME)) {
    return localStorage.getItem(TOKEN_NAME);
  }
  return "";
};

// const get_name = () => {
//   if (localStorage.getItem(USER_NAME)) {
//     return localStorage.getItem(USER_NAME);
//   }
//   return null;
// };

const get_user_role = () => {
  const token = get_token();
  if (!token) return USER_ROLES.unauthorized;
  const decoded_token = __deocde_token(token);
  if (decoded_token.expiresIn >= Date.now()) {
    remove_token();
    return USER_ROLES.unauthorized;
  }
  return decoded_token.role;
};

const get_user_name = () => {
  const token = get_token();
  const decoded_token = __deocde_token(token);
  return decoded_token.name;
};

const set_token = (token) => {
  if (!token) return;
  localStorage.setItem(TOKEN_NAME, token);
};

const remove_token = () => {
  localStorage.removeItem(TOKEN_NAME);
};

const is_logged_in = () => {
  const token = get_token();
  if (token && get_user_role() !== USER_ROLES.unauthorized) return true;
  return false;
};

export {
  remove_token,
  set_token,
  get_token,
  get_user_role,
  get_user_name,
  is_logged_in,
};
