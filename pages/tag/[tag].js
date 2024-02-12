import { getAllPosts } from '@/lib/notion'
import SearchLayout from '@/layouts/search'
import { useRouter } from 'next/router'

export default function Tag({ posts, currentTag }) {  
  
  // to remove error pre-render next.js 
  let filteredPosts = []
  if (posts !== undefined){
    filteredPosts = posts
  }

  return <SearchLayout posts={filteredPosts} currentTag={currentTag} filterTag={true}/>
}

export async function getStaticProps({ params }) {
  const currentTag = params.tag
  const posts = await getAllPosts({ onlyProjectsAndPosts: true})
  const tags = getAllTags(posts)

  return {
    props: {
      posts: posts,
      currentTag
    },
    revalidate: 1
  }
}

export async function getStaticPaths() {
  const posts = await getAllPosts({ onlyProjectsAndPosts: true })
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