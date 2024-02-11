import { getAllPosts } from '@/lib/notion'
import SearchLayout from '@/layouts/search'
import { useRouter } from 'next/router'

export default function search({ posts }) {
  const { locale } = useRouter()

  const postsToShow = posts.filter((post) => post?.language == locale)
  const tagsLanguage = getAllTags(postsToShow)
  
  return <SearchLayout tags={tagsLanguage} posts={postsToShow} />
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

function getAllTags(posts) {
  const taggedPosts = posts.filter((post) => post?.tags)
  const tags = [...taggedPosts.map((p) => p.tags).flat()]
  const tagObj = {}
  tags.forEach((tag) => {
    if (tag in tagObj) {
      tagObj[tag]++
    } else {
      tagObj[tag] = 1
    }
  })
  return tagObj
}