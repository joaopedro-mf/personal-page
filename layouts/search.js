import { useState } from 'react'
import BlogPost from '@/components/BlogPost'
import Container from '@/components/Container'
import PropTypes from 'prop-types'
import { lang } from '@/lib/lang'
import { useRouter } from 'next/router'
import PaginationSearch from '@/components/PaginationSearch'

import BLOG from '@/blog.config'

const SearchLayout = ({  posts, currentTag }) => {

  const { locale } = useRouter()

  let postsToShow = posts.filter((post) => post?.language == locale)
  const tags = getAllTags(postsToShow)

  const [searchValue, setSearchValue] = useState('')
  const [pageValue, setPageValue] = useState(1)
  const [tagValue, setTagValue] = useState('')
  const [selectedFilter, setSelectedFilter] = useState(false)


  const t = lang[locale]

  let filteredBlogPosts = []
  if (postsToShow) {
    filteredBlogPosts = postsToShow.filter((post) => {
      const tagContent = post.tags ? post.tags.join(' ') : ''
      const searchContent = post.title + post.summary + tagContent
      return searchContent.toLowerCase().includes(searchValue.toLowerCase())  
    })
  }

  if(tagValue !== '' && !selectedFilter){
    filteredBlogPosts = filteredBlogPosts.filter((post) => {
      const tagContent = post.tags ? post.tags.join(' ') : ''
      return tagContent.includes(tagValue) 
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
            tagValue
              ? `${t.SEARCH.ONLY_SEARCH} #${tagValue}`
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

      <div className='tag-container'>
        <div className='flex flex-wrap justify-center mt-4'>
          {Object.keys(tags).map((key) => {
            const selected = key === tagValue
            return (
              <div
                key={key}
                className={`m-1 font-medium rounded-lg whitespace-nowrap hover:text-gray-100 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-600 ${
                  selected
                    ? 'text-gray-100 bg-gray-400 dark:bg-gray-600'
                    : 'text-gray-400 bg-gray-100 dark:bg-night'
                }`}
              >
                <button key={key} 
                  className='px-4 py-2 block'
                  onClick = {() => { selected ? setTagValue('') : setTagValue(key) }}
                >
                  {`${key} (${tags[key]})`}
                </button>
              </div>
            )
          })}
        </div>
      </div>


      {/* <Tags tags={tags} currentTag={currentTag} /> */}
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

export default SearchLayout
