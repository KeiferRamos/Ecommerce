import { useEffect, useState } from "react";
import { UseGlobalContext } from "../GlobalContext/GlobalContext";

const Functionality = () => {
  const [hasAccount, setHasAccount] = useState(true);
  const [index, setIndex] = useState(0);
  const [label, setLabel] = useState("ShopOnClick");
  const { users, setActiveUser, setUsers } = UseGlobalContext();
  const [show, setShow] = useState(false);
  const [account, setAccount] = useState({
    email: "",
    username: "",
    password: "",
    confirm: "",
    cart: [],
    voucher: [],
    infos: { name: "", address: "", contact: "" },
  });

  const clearInputs = () =>
    setAccount({
      email: "",
      username: "",
      password: "",
      confirm: "",
      cart: [],
      voucher: [],
      infos: { name: "", address: "", contact: "" },
    });

  useEffect(() => {
    if (label !== "ShopOnClick") {
      const timer = setTimeout(() => {
        setLabel("ShopOnClick");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [label]);

  const createAcc = () => {
    const { email, username, password, confirm } = account;
    if (hasAccount) {
      setHasAccount(false);
      clearInputs();
    } else {
      if (email && username && password && confirm) {
        const invalidEmail = users.find((user) => user.email == email);
        if (password !== confirm) {
          setLabel("pass not match");
        } else if (!email.endsWith("@gmail.com")) {
          setLabel("email invalid");
        } else if (password.length < 8) {
          setLabel("short pass");
        } else if (invalidEmail) {
          setLabel("email already in use");
        } else {
          setUsers([...users, account]);
          setHasAccount(true);
          clearInputs();
          setShow(false);
        }
      } else {
        return;
      }
    }
  };

  const Login = () => {
    const validEmail = users.find((user) => user.email == account.email);
    const { email, username, password } = validEmail;
    if (hasAccount) {
      if (validEmail) {
        if (account.password !== validEmail.password) {
          setLabel("wrong pass");
        } else {
          setActiveUser({ email, username, password });
          clearInputs();
        }
      } else if (!account.email && !account.password) {
        return;
      } else {
        setLabel("email not recognized");
      }
    } else {
      setHasAccount(true);
      clearInputs();
    }
  };

  const SetIndex = (i) => setIndex(i);
  const hidePass = () => setShow(!show);

  return {
    Login,
    createAcc,
    hidePass,
    SetIndex,
    index,
    show,
    setAccount,
    hasAccount,
    label,
    account,
  };
};

export default Functionality;
