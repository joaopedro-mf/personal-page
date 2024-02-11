import Container from '@/components/Container'
import BlogPost from '@/components/BlogPost'
import Hero from '@/components/Hero/Home'
import Pagination from '@/components/Pagination'
import { getAllPosts, getPostBlocks } from '@/lib/notion'
import { useRouter } from 'next/router'
import { lang } from '@/lib/lang'

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
    // return { props: { post: null, blockMap: null } }
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
  const { locale } = useRouter()
  const t = lang[locale]
  const postsToShow = posts.filter((post) => post?.language == locale)
                           .slice(0, BLOG.postsPerPage)
  const totalPosts = postsToShow.length
  const showNext = totalPosts > BLOG.postsPerPage

  return (
    <Container title={BLOG.title} description={BLOG.description}>
      <Hero blockMap={blockMap[locale]} />
      {/* font-light hidden md:block leading-8 text-gray-700 dark:text-gray-300 */}
      <h2 className='text-lg md:text-xl font-medium mb-6 text-black dark:text-gray-500 '>{t.INDEX.POST}</h2>
      {/* <div className='flex flex-row gap-x-2 flex-wrap'> */}
        {
          postsToShow.map((post) => ( <BlogPost key={post.id} post={post} /> ))
        }
      {/* </div> */}
      {/* {showNext && <Pagination page={page} showNext={showNext} />} */}
    </Container>
  )
}

export default blog
