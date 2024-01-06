import PostCard from "@/components/PostCard";
import PostCreateModal from "@/components/modals/PostCreateModal";
import { getPosts } from "@/services/postServices";
import Image from "next/image";

const Posts = async () => {
  const posts = await getPosts();
  console.log(posts);

  return (
    <div>
      <h1 className="text-3xl my-8 text-center">Posts Lists</h1>
      <div className="text-center">
        <PostCreateModal />
      </div>
      <div className="grid lg:grid-cols-2 justify-center gap-10 p-6 md:p-12">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Posts;
