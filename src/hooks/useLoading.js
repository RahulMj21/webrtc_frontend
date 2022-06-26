import axios from "../http";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../features/authSlice";

export function useLoading() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/refresh`)
      .then((res) => {
        const user = res.data.user;
        dispatch(setUser(user));
      })
      .catch((error) => {
        console.log("useLoading hook error-->", error);
      })
      .finally(() => setLoading(false));
  }, []);
  return { loading };
}
