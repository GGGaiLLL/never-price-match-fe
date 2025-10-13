import { useState } from "react";

import styles from "./index.module.css";
import {
  useCheckEmailExistLazyQuery,
  useLoginMutation,
} from "../../__generated__/graphql";

function HomePage() {
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
      <div></div>
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

export default HomePage;
