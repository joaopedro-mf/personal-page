import BLOG from '@/blog.config'
import { lang } from '@/lib/lang'
import { useRouter } from 'next/router'
import BlogPost from '@/components/BlogPost'
import Container from '@/components/Container'

const RecentPosts = ({ posts }) => {
    const { locale } = useRouter()
    const t = lang[locale]
    const postsToShow = posts.filter((post) => post?.language == locale)
                           .slice(0, BLOG.postsPerPage)

    return (
        <Container>
        <div className='article-container my-8'>
        <h2 className='text-lg md:text-xl font-medium mb-6 text-black dark:text-gray-500 '>{t.INDEX.POST}</h2>
        {
          postsToShow.map((post) => ( <BlogPost key={post.id} post={post} /> ))
        }
        </div>
        </Container>
    )
}

export default RecentPosts
