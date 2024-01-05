import { User } from "@/types/types";
import Image from "next/image";
import UserEditModal from "./modals/UserEditModal";
import UserDeleteButton from "./buttons/UserDeleteButton";

const UserCard = ({ user }: { user: User }) => {
  return (
    <div className="flex items-center gap-4">
      <div className="">
        <Image
          src={user.picture}
          alt="user"
          width={100}
          height={100}
          className="size-20 rounded-full "
        />
      </div>
      <div>
        <p className="text-muted-foreground text-sm">{user.id}</p>
        <p className="font-semibold">
          {user.title
            ? user.title?.slice(0, 1).toUpperCase() +
              user.title?.slice(1) +
              ". "
            : ""}
          {user.firstName} {user.lastName}
        </p>
      </div>
      <div className="ml-auto">
        <UserEditModal userId={user.id} />
        <UserDeleteButton userId={user.id} />
      </div>
    </div>
  );
};

export default UserCard;
