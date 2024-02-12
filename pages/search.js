import { getAllPosts } from '@/lib/notion'
import SearchLayout from '@/layouts/search'


export default function search({ posts }) {
  return <SearchLayout posts={posts} />
}

export async function getStaticProps() {
  const posts = await getAllPosts({ onlyNewsletter: false ,onlyPost: true})
  return {
    props: {
      posts
    },
    revalidate: 1
  }
}

