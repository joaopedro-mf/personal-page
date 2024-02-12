import Container from '@/components/Container'
import SearchLayout from '@/layouts/search'
import { getAllPosts } from '@/lib/notion'
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

const projects = ({ posts }) => {
  return (
    <Container title={BLOG.projects} description={BLOG.description}>
      <SearchLayout  posts={posts} />
    </Container>
  )
}



export default projects
