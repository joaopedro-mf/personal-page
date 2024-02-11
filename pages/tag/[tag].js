import { getAllPosts } from '@/lib/notion'
import SearchLayout from '@/layouts/search'
import { useRouter } from 'next/router'

export default function Tag({ tags, posts, currentTag }) {
  const { locale } = useRouter()
  
  const postsLanguage = posts.filter((post) => post?.language == locale)
  const filteredPosts = posts.filter(
    (post) => post && post.tags && post.tags.includes(currentTag) && post?.language == locale
  )

  const tagsLanguage = getAllTags(postsLanguage)

  return <SearchLayout tags={tagsLanguage} posts={filteredPosts} currentTag={currentTag} />
}

export async function getStaticProps({ params }) {
  const currentTag = params.tag
  const posts = await getAllPosts({ onlyProjects: false , onlyPost: true})
  const tags = getAllTags(posts)

  return {
    props: {
      tags,
      posts: posts,
      currentTag
    },
    revalidate: 1
  }
}

export async function getStaticPaths() {
  const posts = await getAllPosts({ onlyProjects: false, onlyPost: true })
  const tags = getAllTags(posts)
  return {
    paths: Object.keys(tags).map((tag) => ({ params: { tag } })),
    fallback: true
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