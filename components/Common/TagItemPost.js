import Link from 'next/link'

const TagItem = ({ tag }) => (
  <Link href={`/tag/${encodeURIComponent(tag)}`} scroll={false}>
    <p className='mr-1 rounded-full px-2 py-1 bg-gray-300 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-600 leading-none text-xs'>
      {tag}
    </p>
  </Link>
)

export default TagItem
