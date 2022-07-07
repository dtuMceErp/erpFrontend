export const INITIAL_STATE = {
  token: " ",
  role: " ",
  name: " ",
};

const AuthReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOGIN":
      const token = action.token;
      const role = action.role;
      const name = action.name;
      return { ...state, token, role, name };

    default:
      return state;
  }
};

export default AuthReducer;
