import Layout from '@/layouts/layout'
import { getAllPosts, getPostBlocks } from '@/lib/notion'
import BLOG from '@/blog.config'
import { useRouter } from 'next/router'
import Loading from '@/components/Loading'
import NotFound from '@/components/NotFound'

const Post = ({ post, blockMap }) => {
  const router = useRouter()
  if (router.isFallback) {
    return (
      <Loading />
    )
  }
  if (!post) {
    return <NotFound statusCode={404} />
  }

  let postLanguage = post.find((t)=> t.language === router.locale)

  if (postLanguage === undefined)
      postLanguage = post[0]

  let blockMapLanguage = blockMap[postLanguage.language]

  return (
    <Layout blockMap={blockMapLanguage} frontMatter={postLanguage} fullWidth={post.fullWidth} />
  )
}

export async function getStaticPaths() {
  const posts = await getAllPosts({ onlyNewsletter: false })
  return {
    paths: posts.map((row) => `${BLOG.path}/${row.slug}`),
    fallback: true
  }
}

export async function getStaticProps({ params: { slug } }) {
  const allPosts = await getAllPosts({ onlyNewsletter: false })
  const post = allPosts.filter((t) => t.slug === slug)

  let blockMap = {}

  for (const item of post) {
    const resultPostBlock = await getPostBlocks(item.id)
    blockMap[item.language] =  resultPostBlock
  }

  try {
    //const blockMap = await getPostBlocks(post.id)
    return {
      props: {
        post,
        blockMap
      },
      revalidate: 1
    }
  } catch (err) {
    console.error(err)
    return {
      props: {
        post: null,
        blockMap: null
      }
    }
  }
}

export default Post
