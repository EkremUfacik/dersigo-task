import { fetcher } from "@/lib/fetcher";
import { User, UserDetails } from "@/types/types";
import { axiosWithAppId } from "./axiosInstance";
import { FieldValues } from "react-hook-form";

export const getUsers = async (search = ""): Promise<User[]> => {
  console.log(search);
  const { data } = await fetcher("/user?page=4");
  if (!search) return data;

  const filteredData = data.filter(
    (user: User) =>
      user.firstName.toLowerCase().includes(search.toLowerCase()) ||
      user.lastName.toLowerCase().includes(search.toLowerCase())
  );
  return filteredData;
};
export const getUser = async (id: string): Promise<UserDetails> => {
  const data = await fetcher(`/user/${id}`);
  return data;
};

export const createUser = async (userInfo: FieldValues) => {
  await axiosWithAppId.post("/user/create", userInfo);
};

export const updateUser = async (id: string, userInfo: FieldValues) => {
  const res = await axiosWithAppId.put(`/user/${id}`, userInfo);
  return res.data;
};

export const deleteUser = async (id: string) => {
  const res = await axiosWithAppId.delete(`/user/${id}`);
  return res.data;
};
