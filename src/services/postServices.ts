import { fetcher } from "@/lib/fetcher";
import { axiosWithAppId } from "./axiosInstance";
import { Post } from "@/types/types";
import { FieldValues } from "react-hook-form";

export const getPosts = async (): Promise<Post[]> => {
  const { data } = await fetcher("/post");
  return data;
};

export const getPost = async (id: string): Promise<Post> => {
  const data = await fetcher(`/post/${id}`);
  return data;
};

export const createPost = async (postInfo: FieldValues) => {
  await axiosWithAppId.post("/post/create", {
    owner: "6598568212e4a21519ef2aad",
    ...postInfo,
  });
};

export const updatePost = async (id: string, postInfo: FieldValues) => {
  const res = await axiosWithAppId.put(`/post/${id}`, postInfo);
  return res.data;
};

export const deletePost = async (id: string) => {
  const res = await axiosWithAppId.delete(`/post/${id}`);
  return res.data;
};
