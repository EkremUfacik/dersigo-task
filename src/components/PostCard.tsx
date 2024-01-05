import Image from "next/image";
import PostDeleteButton from "./buttons/PostDeleteButton";
import { Post } from "@/types/types";
import PostEditModal from "./modals/PostEditModal";

const PostCard = ({ post }: { post: Post }) => {
  console.log(post);
  const formatDate = (date: string) => {
    const dateObj = new Date(date);
    return `${dateObj.getDate()}/${dateObj.getMonth()}/${dateObj.getFullYear()}`;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Image
          src={post.owner.picture}
          alt="user image"
          width={50}
          height={50}
          className="rounded-full aspect-square"
        />
        <div>
          <p className="font-semibold">
            {post.owner.firstName} {post.owner.lastName}
          </p>
          <p className="text-muted-foreground">
            {formatDate(post.publishDate)}
          </p>
        </div>
      </div>
      <div className="flex gap-4">
        <div className=" flex-[2]">
          <Image
            src={post.image}
            alt="post image"
            width={400}
            height={400}
            className="aspect-square w-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-between flex-1 ">
          <p className="font-semibold mt-2">{post.text}</p>
          <div className="space-x-4">
            <PostEditModal postId={post.id} />
            <PostDeleteButton postId={post.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
