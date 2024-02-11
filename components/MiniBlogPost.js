import BLOG from '@/blog.config'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

import FormattedDate from '@/components/Common/FormattedDate'

const MiniBlogPost = ({ post }) => {
  return (
        <motion.div class="w-1/3">
        <Link passHref href={`${BLOG.path}/${post.slug}`} scroll={false}>
            <article
            key={post.id}
            className='group flex flex-col overflow-hidden relative mb-8 md:mb-8 cursor-pointer rounded-xl p-5 md-cover absolute inset-0'
            >
            <Image
                fill
                alt={`${post.title}`}
                src={post?.page_cover}
                className='w-full h-full object-cover object-center absolute inset-0 group-hover:scale-110 transition duration-200'
            />
            <div className='hidden md:block md-cover absolute inset-0'></div>
            <div className='md:hidden sm-cover absolute inset-0'></div>
            <div className='relative mt-auto'>
                <header className='flex flex-row justify-between md:flex-row md:items-baseline'>
                <h2 className='text-black dark:text-gray-100'>{post.title}</h2> 
                {/* text-lg md:text-xl font-medium mb-2  */}
                <span className='text-color-fix font-light flex-shrink-0 text-gray-600 dark:text-gray-400'>
                    <FormattedDate date={post.date} />
                </span>
                </header>
                {/* <p className='font-light hidden md:block leading-8 text-gray-700 dark:text-gray-300'>{post.summary}</p> */}
                {/* w-4/5  */}
            </div>
            </article>
        </Link>
        </motion.div>
  )
}

export default MiniBlogPost
