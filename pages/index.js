import Container from '@/components/Container'
import Hero from '@/components/Hero/Home'
import RecentPosts from '@/components/Hero/RecentPosts'
import { getAllPosts, getPostBlocks } from '@/lib/notion'

import BLOG from '@/blog.config'

export async function getStaticProps() {
  const posts = await getAllPosts({ onlyPost: true })

  const heros = await getAllPosts({ onlyHidden: true })
  const hero = heros.filter((t) => t.slug === 'index')

  let blockMap = {}

  try {
    for (const content of hero) {
      const resultPostBlock = await getPostBlocks(content.id)
      blockMap[content.language] =  resultPostBlock
    }
  } catch (err) {
    console.error(err)
  }

  return {
    props: {
      page: 1, // current page is 1
      posts, 
      blockMap
    },
    revalidate: 1
  }
}

const blog = ({ posts, page, blockMap }) => {

  return (
    <Container title={BLOG.title} description={BLOG.description}>
      <Hero blockMap={blockMap} />
      <RecentPosts posts={posts} />
    </Container>
  )
}

export default blog
