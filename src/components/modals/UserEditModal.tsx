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
import { UserDetails } from "@/types/types";
import { FieldValues, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "../ui/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { getUser, updateUser } from "@/services/userServices";
import { useQuery } from "@tanstack/react-query";

const UserEditModal = ({ userId }: { userId: string }) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const { data: user, isPending } = useQuery<UserDetails>({
    queryKey: ["user", userId],
    queryFn: () => getUser(userId),
    enabled: open,
  });

  console.log(user);

  const form = useForm();

  const { isSubmitting } = form.formState;

  const handleUpdate = async (data: FieldValues) => {
    try {
      await updateUser(user?.id ?? "", data);
      router.refresh();
      setOpen(false);
      toast({
        description: "User updated successfully!",
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
          firstName: user?.firstName,
          lastName: user?.lastName,
          picture: user?.picture,
        },
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleChange}>
      <DialogTrigger asChild>
        <Button variant="secondary" size={"sm"}>
          Edit User
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
            <DialogTitle className="text-center">Edit User</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleUpdate)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name:</FormLabel>
                    <FormControl>
                      <Input {...field} defaultValue={user?.firstName} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name:</FormLabel>
                    <FormControl>
                      <Input {...field} defaultValue={user?.lastName} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="picture"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Picture:</FormLabel>
                    <FormControl>
                      <Input {...field} defaultValue={user?.picture} />
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

export default UserEditModal;
