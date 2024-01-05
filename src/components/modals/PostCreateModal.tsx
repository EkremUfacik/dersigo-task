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
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "../ui/use-toast";
import { FieldValues, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { createPost } from "@/services/postServices";

const PostCreateModal = () => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      image: "",
      text: "",
    },
  });

  const { isSubmitting } = form.formState;

  const handleCreate = async (data: FieldValues) => {
    try {
      console.log(data);
      await createPost(data);
      form.reset();
      router.refresh();
      setOpen(false);
      toast({
        description: "Post created successfully!",
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create Post</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Create Post</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreate)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Post Image:</FormLabel>
                  <FormControl>
                    <Input type="url" required {...field} />
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
                    <Input required {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" className="mx-auto" disabled={isSubmitting}>
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PostCreateModal;
