import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  useCheckEmailExistLazyQuery,
  useCheckEmailExistQuery,
  useCreateUserMutation,
  useLoginMutation,
} from "./__generated__/graphql";
function App() {
  const [count, setCount] = useState(0);
  // const [createUserMutation, { loading, error }] = useCreateUserMutation();
  const [checkEmailExist] = useCheckEmailExistLazyQuery();
  const [login, { loading, error }] = useLoginMutation();
  const createUser = async () => {
    // const result = await createUserMutation({
    //   variables: {
    //     input: {
    //       name: "Alex",
    //       email: "alex@test.com",
    //       password: "password123",
    //     },
    //   },
    // });
    // console.log("Server response:", result);
    // if (loading) {
    //   console.log("Loading...");
    // }
    // if (error) {
    //   console.error("Error:", error);
    // }
    // const res = await checkEmailExist({
    //   variables: { email: "alex@test.com" },
    // });
    const res = await login({
      variables: {
        input: {
          email: "alex@test.com",
          password: "password123",
        },
      },
    });
    console.log("Email exists:", res.data?.login.ok);
    console.log("Loading...", loading);
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => createUser()}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
