import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDBS from "@/lib/db";
import Blog from "@/models/Blog";
import EditBlogForm from "./EditBlogForm";
import { notFound, redirect } from "next/navigation";

export default async function EditBlogPage({ params }: { params: { slug: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) redirect("/login");

  await connectToDBS();

  const blog = await Blog.findOne({ slug: params.slug }).populate("author");

  if (!blog || blog.author.email !== session.user.email) return notFound();

  return (
    <div className="min-h-screen bg-background px-4 py-8 text-white md:px-12">
      <h1 className="text-3xl font-bold mb-6 text-purple-400">Edit Blog</h1>
      <EditBlogForm blog={JSON.parse(JSON.stringify(blog))} />
    </div>
  );
}
