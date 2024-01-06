import UserCard from "@/components/UserCard";
import UserCreateModal from "@/components/modals/UserCreateModal";
import { getUser, getUsers } from "@/services/userServices";

const Home = async () => {
  const users = await getUsers();

  console.log(users);

  return (
    <div className="">
      <h1 className="text-3xl my-8 text-center">Users Lists</h1>
      <div className="text-center">
        <UserCreateModal />
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-10 p-6 md:p-12">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Home;
