"use client";

import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { deletePost } from "@/services/postServices";

const PostDeleteButton = ({ postId }: { postId: string }) => {
  const router = useRouter();
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      await deletePost(postId);
      router.refresh();
      toast({
        description: "Post deleted successfully!",
      });
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        description: "Something went wrong!",
      });
    }
  };
  return (
    <Button className="" size={"sm"} onClick={handleDelete}>
      Delete
    </Button>
  );
};

export default PostDeleteButton;
