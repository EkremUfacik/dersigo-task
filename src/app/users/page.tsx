import SearchInput from "@/components/SearchInput";
import UserCard from "@/components/UserCard";
import UserCreateModal from "@/components/modals/UserCreateModal";
import { getUsers } from "@/services/userServices";

interface SearchParams {
  searchParams: {
    search: string;
  };
}

const Home = async ({ searchParams: { search } }: SearchParams) => {
  const users = await getUsers(search);

  return (
    <div className="">
      <h1 className="text-3xl my-8 text-center">Users Lists</h1>

      <div className="text-center">
        <UserCreateModal />
        <div className="flex justify-end my-4 me-20">
          <SearchInput />
        </div>
      </div>

      {users.length === 0 ? (
        <p className="text-center my-10 font-semibold">User Not Found...</p>
      ) : (
        <div className="grid lg:grid-cols-2 justify-center gap-8 mb-10 p-6 md:p-12">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
