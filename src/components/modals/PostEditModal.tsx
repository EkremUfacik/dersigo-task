"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Post, UserDetails } from "@/types/types";
import { FieldValues, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "../ui/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useQuery } from "@tanstack/react-query";
import { getPost, updatePost } from "@/services/postServices";

const PostEditModal = ({ postId }: { postId: string }) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const { data: post, isPending } = useQuery<Post>({
    queryKey: ["post", postId],
    queryFn: () => getPost(postId),
    enabled: open,
  });

  console.log(post);

  const form = useForm();

  const { isSubmitting } = form.formState;

  const handleUpdate = async (data: FieldValues) => {
    try {
      await updatePost(post?.id ?? "", data);
      router.refresh();
      setOpen(false);
      toast({
        description: "Post updated successfully!",
      });
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        description: "Something went wrong!",
      });
    }
  };

  const handleChange = () => {
    setOpen(!open);
    if (open) {
      form.reset({
        defaultValues: {
          image: post?.image,
          text: post?.text,
        },
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleChange}>
      <DialogTrigger asChild>
        <Button variant="secondary" size={"sm"}>
          Edit Post
        </Button>
      </DialogTrigger>
      {isPending ? (
        <DialogContent className="sm:max-w-[425px] my-20">
          <p className="">Loading...</p>
        </DialogContent>
      ) : (
        <DialogContent
          className="sm:max-w-[425px]"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle className="text-center">Edit Post</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleUpdate)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Post Image:</FormLabel>
                    <FormControl>
                      <Input {...field} defaultValue={post?.image} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Post Text:</FormLabel>
                    <FormControl>
                      <Input {...field} defaultValue={post?.text} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  type="submit"
                  className="mx-auto"
                  disabled={isSubmitting}
                >
                  Update
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default PostEditModal;
