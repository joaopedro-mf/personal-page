import Link from 'next/link'
import BLOG from '@/blog.config'
import { lang } from '@/lib/lang'
import { useRouter } from 'next/router'
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/outline'

const PaginationSearch = ({ page, showNext, addPage, decrPage }) => {
  const { locale } = useRouter()
  const t = lang[locale]
  const currentPage = +page
  let additionalClassName = 'justify-between'
  if (currentPage === 1 && showNext) additionalClassName = 'justify-end'
  if (currentPage !== 1 && !showNext) additionalClassName = 'justify-start'

  console.log(page)
  return (
    <div
      className={`flex font-medium text-black dark:text-gray-100 ${additionalClassName}`}
    >
      {currentPage !== 1 && (
          <button rel='prev' className='block cursor-pointer' onClick={decrPage}>
            <ChevronLeftIcon className='inline-block mb-1 h-5 w-5' />{' '}
            {t.PAGINATION.PREV}
          </button>
      )}
      {showNext && (
          <button rel='next' className='block cursor-pointer' onClick={addPage}>
            {t.PAGINATION.NEXT}{' '}
            <ChevronRightIcon className='inline-block mb-1 h-5 w-5' />
          </button>
      )}
    </div>
  )
}

export default PaginationSearch
