import React, { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { useLogoutMutation } from "../../__generated__/graphql";
import styles from "./index.module.css";
import { App, Button, message, Popconfirm } from "antd";
import SigninModal from "./signinModal";
import SignupModal from "./signupModal";

const Header: React.FC = () => {
  const { user, setUser } = useAuthStore();
  const [logout] = useLogoutMutation();
  const [signinModalOpen, setSigninModalOpen] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const { message } = App.useApp();

  const handleLogout = async () => {
    const res = await logout();
    if (res.data?.logout) {
      setUser(null);
      localStorage.removeItem("priceMatchSession");
      message.success({
        content: "Logout success",
      });
    } else {
      message.error({
        content: "Logout failed",
      });
    }
  };

  return (
    <header className={styles.header}>
      <div>
        <a
          href="/"
          style={{
            fontWeight: "bold",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          Never Price Match
        </a>
      </div>
      <nav>
        {user ? (
          <div className={styles.userInfo}>
            <span>Welcome, {user.name}</span>
            {/* logout button */}
            <Popconfirm
              title="Logout"
              description="Are you sure you want to logout?"
              okText="Logout"
              onConfirm={handleLogout}
            >
              <Button variant="dashed" color="default">
                Logout
              </Button>
            </Popconfirm>
          </div>
        ) : (
          <div className={styles.loginButtons}>
            <Button
              color="primary"
              variant="outlined"
              onClick={() => setSigninModalOpen(true)}
            >
              Sign in
            </Button>
            <Button
              color="primary"
              variant="solid"
              onClick={() => setSignupModalOpen(true)}
            >
              Sign up
            </Button>
          </div>
        )}
      </nav>
      <SigninModal
        open={signinModalOpen}
        onCancel={() => setSigninModalOpen(false)}
      />
      <SignupModal
        open={signupModalOpen}
        onCancel={() => setSignupModalOpen(false)}
      />
    </header>
  );
};

export default Header;
