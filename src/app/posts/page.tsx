import PostCard from "@/components/PostCard";
import SearchInput from "@/components/SearchInput";
import PostCreateModal from "@/components/modals/PostCreateModal";
import { getPosts } from "@/services/postServices";

interface SearchParams {
  searchParams: {
    search: string;
  };
}

const Posts = async ({ searchParams: { search } }: SearchParams) => {
  const posts = await getPosts(search);

  return (
    <div>
      <h1 className="text-3xl my-8 text-center">Posts Lists</h1>

      <div className="text-center">
        <PostCreateModal />
        <div className="flex justify-end my-4 me-20">
          <SearchInput />
        </div>
      </div>
      {posts.length === 0 ? (
        <p className="text-center my-10 font-semibold">Post Not Found...</p>
      ) : (
        <div className="grid lg:grid-cols-2 justify-center gap-10 p-6 md:p-12">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Posts;
