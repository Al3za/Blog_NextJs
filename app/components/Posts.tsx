import {getSortedPostsData} from '@/lib/posts'
import ListItems from './ListItems';

export default function Posts() {

    const post = getSortedPostsData();
  return (
    <section className="mt-6 mx-auto max-w-2xl">
            <h2 className="text-4xl font-bold dark:text-white/90">Blog</h2>
            <ul className="w-full">
              {post.map((post) => {
                return <ListItems key={post.id} post={post} />
            })}
            </ul>
        </section>
  )
}
