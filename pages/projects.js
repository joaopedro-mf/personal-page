import Container from '@/components/Container'
import SearchLayout from '@/layouts/search'
import { getAllPosts } from '@/lib/notion'
import { useRouter } from 'next/router'
import BLOG from '@/blog.config'

export async function getStaticProps() {
  const posts = await getAllPosts({ onlyProjects: true })

  return {
    props: {
      posts
    },
    revalidate: 1
  }
}

const newsletter = ({ posts }) => {
  const { locale } = useRouter()

  const postsToShow = posts.filter((post) => post?.language == locale)
  const tagsLanguage = getAllTags(postsToShow)

  return (
    <Container title={BLOG.projects} description={BLOG.description}>
      <SearchLayout  tags={tagsLanguage} posts={postsToShow} />
    </Container>
  )
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

export default newsletter
