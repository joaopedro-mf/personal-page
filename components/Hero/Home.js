import BLOG from '@/blog.config'
import Link from 'next/link'
import Avatar from './Avatar.js'

import Social from '../Common/Social.js'
import { lang } from '@/lib/lang'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { MailIcon } from '@heroicons/react/outline'
import NotionRenderer from '@/components/Post/NotionRenderer'

const Hero = ({ blockMap }) => {
  const [showCopied, setShowCopied] = useState(false)
  const { locale } = useRouter()
  const t = lang[locale]
  const showButtons = false

  const clickCopy = async () => {
    setShowCopied(true)
    navigator.clipboard.writeText(BLOG.link + '/feed')
    setTimeout(() => {
      setShowCopied(false)
    }, 1000)
  }

  return (
    <>
      <div className='container mx-auto flex px-5 py-2 mb-10 md:flex-row flex-col items-center'>
        <div className='flex flex-col md:w-3/5 md:items-start mb-6 md:mb-0 text-left '>
          <NotionRenderer
            className='md:ml-0'
            blockMap={blockMap}
            frontMatter={{}}
            subPageTitle={null}
          />
          <Social />
          
          <div className='flex flex-col sm:flex-row sm:justify-center gap-4 mt-6'>
          { showButtons ? ( 
            <Link passHref href='/contact' scroll={false}>
              <button className='w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 inline-flex py-3 px-5 rounded-lg items-center'>
                <MailIcon className='inline-block text-gray-600 dark:text-day h-7 w-7 mt-1' />
                <span className='ml-4 flex items-start flex-col leading-none'>
                  <span className='text-xs text-gray-600 dark:text-day mb-1'>
                    {t.HERO.HOME.CONTACT_BUTTON_DES}
                  </span>
                  <span className='font-medium'>{t.HERO.HOME.CONTACT_BUTTON}</span>
                </span>
              </button>
            </Link> ) :  <span  className='text-xs text-gray-600 dark:text-day mb-1'> </span>}
            
          </div>
        </div>
        {/*desapaer in phone screen*/}
        <div className='hidden md:flex md:gap-1 w-2/5'>
          <Avatar className='text-gray-600 dark:text-gray-300' />
        </div>
      </div>

    </>
  )
}

export default Hero
