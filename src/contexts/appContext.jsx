import React, { useEffect, useState } from "react";
import Api from "../api";
import { isLoginAtom, userPersonalDataAtom } from "../atoms/global";
import { useAtom } from "jotai";
import { Alert } from "react-native";

export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [isLogin] = useAtom(isLoginAtom);
  const [userData, setUserData] = useAtom(userPersonalDataAtom);

  const addBookmark = (bookmark) => {
    setBookmarks((prevBookmarks) => [...prevBookmarks, bookmark]);
  };

  const removeBookmark = (bookmark) => {
    setBookmarks((prevBookmarks) =>
      prevBookmarks.filter((b) => b !== bookmark)
    );
  };

  useEffect(() => {
    const getData = async () => {
      if (!isLogin) return;

      const res = await Api.getWishlistIds(userData?.id);

      if (res?.error) {
        Alert.alert("Error", res?.error);
        return;
      }

      setBookmarks(res);
    };

    getData();
  }, [isLogin, userData?.id]);

  return (
    <AppContext.Provider
      value={{
        bookmarks,
        addBookmark,
        removeBookmark,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => React.useContext(AppContext);
