import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectToDBS from '@/lib/db';
import Blog from '@/models/Blog';
import { notFound } from 'next/navigation';
import BlogPageClient from './BlogPageClient';

export default async function BlogPage({ params }: { params: { slug: string } }) {
  const session = await getServerSession(authOptions);
  await connectToDBS();

  const blog = await Blog.findOne({ slug: params.slug }).populate("author").lean();

  if (!blog) return notFound();

  const safeBlog = JSON.parse(JSON.stringify(blog)); // ensures serializable props
  const isAuthor = session?.user?.email === safeBlog.author?.email;

  return <BlogPageClient blog={safeBlog} isAuthor={isAuthor} />;
}
