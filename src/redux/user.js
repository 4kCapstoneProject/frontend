import { configureStore, createSlice } from "@reduxjs/toolkit"; // npm install @reduxjs/toolkit

const users = createSlice({
  name: "userReducer",
  initialState: [],
  reducers: {
    userAdd: (state, action) => {
      // state.push({
      //   pk: action.payload,
      // });

      // return [{ pk: action.payload }];

      return [{ user: action.payload }];
    },

    // remove: (state, action) =>
    //   state.filter((toDo) => toDo.id !== action.payload),
  },
});

export const { userAdd } = users.actions; // toDos.actions로 부터 add, remove라는 action을 export 할 수 있음

export default configureStore({ reducer: users.reducer }); // 브라우저에서 Redux Developer Tools로 redux 상태 확인 가능하게 해줌
