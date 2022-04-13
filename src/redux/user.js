import { configureStore, createSlice } from "@reduxjs/toolkit"; // npm install @reduxjs/toolkit

const users = createSlice({
  name: "userReducer",
  initialState: [],
  reducers: {
    userAdd: (state, action) => {
      // action에 부가적으로 필요한 값은 payload에 담아짐 (여기선 사용자가 input으로 타이핑한 text값을 받게 됨)
      state.push({
        id: action.payload.userId,
        password: action.payload.userPw,
        auth: action.payload.auth,
        email: action.payload.email,
      });
    },

    // remove: (state, action) =>
    //   state.filter((toDo) => toDo.id !== action.payload),
  },
});

export const { userAdd } = users.actions; // toDos.actions로 부터 add, remove라는 action을 export 할 수 있음

export default configureStore({ reducer: users.reducer }); // 브라우저에서 Redux Developer Tools로 redux 상태 확인 가능하게 해줌
