import { useState } from 'react'
import BlogPost from '@/components/BlogPost'
import Container from '@/components/Container'
import Tags from '@/components/Common/Tags'
import PropTypes from 'prop-types'
import Pagination from '@/components/Pagination'
import { lang } from '@/lib/lang'
import { useRouter } from 'next/router'
import PaginationSearch from '@/components/PaginationSearch'

import BLOG from '@/blog.config'

const SearchLayout = ({ tags, posts, currentTag }) => {
  const [searchValue, setSearchValue] = useState('')
  const [pageValue, setPageValue] = useState(1)
  const { locale } = useRouter()
  const t = lang[locale]



  let filteredBlogPosts = []
  if (posts) {
    filteredBlogPosts = posts.filter((post) => {
      const tagContent = post.tags ? post.tags.join(' ') : ''
      const searchContent = post.title + post.summary + tagContent
      return searchContent.toLowerCase().includes(searchValue.toLowerCase())
    })
  }

  let showPosts = filteredBlogPosts.slice((pageValue-1)*BLOG.postsPerPage, pageValue*BLOG.postsPerPage);
  let nextPage =  filteredBlogPosts.slice((pageValue)*BLOG.postsPerPage, (pageValue+1)*BLOG.postsPerPage);

  return (
    <Container>
      <div className='relative'>
        <input
          type='text'
          placeholder={
            currentTag
              ? `${t.SEARCH.ONLY_SEARCH} #${currentTag}`
              : `${t.SEARCH.PLACEHOLDER}`
          }
          className='w-full bg-white dark:bg-gray-600 shadow-md rounded-lg outline-none focus:shadow p-3'
          onChange={(e) => {setSearchValue(e.target.value); setPageValue(1)  }}
        />
        <svg
          className='absolute right-3 top-3 h-5 w-5 text-gray-400'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
          ></path>
        </svg>
      </div>
      <Tags tags={tags} currentTag={currentTag} />
      <div className='article-container my-8'>
        {!filteredBlogPosts.length && (
          <p className='text-gray-500 dark:text-gray-300'> {t.SEARCH.NOT_FOUND} </p>
        )}
        {showPosts.map((post) => (
          <BlogPost key={post.id} post={post} />
        ))}
         {<PaginationSearch page={pageValue} showNext={nextPage.length>0} 
                            addPage={() => setPageValue(pageValue+1) } 
                            decrPage={() => setPageValue(pageValue-1) }/>}
      </div>
    </Container>
  )
}
SearchLayout.propTypes = {
  posts: PropTypes.array.isRequired,
  tags: PropTypes.object.isRequired,
  currentTag: PropTypes.string
}
export default SearchLayout
