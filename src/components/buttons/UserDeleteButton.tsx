"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { deleteUser } from "@/services/userServices";
import { useToast } from "../ui/use-toast";

const UserDeleteButton = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      await deleteUser(userId);
      router.refresh();
      toast({
        description: "User deleted successfully!",
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
    <Button
      variant={"default"}
      size={"sm"}
      className="ml-4"
      onClick={handleDelete}
    >
      Delete
    </Button>
  );
};

export default UserDeleteButton;
