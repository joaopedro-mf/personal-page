import { TranslateIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'

const LangSwitcher = () => {
  const { locale, asPath } = useRouter()

  // const getNamePathWithLanguage = (name, local) => {
  //   console.log(local)
  //   var teste = local === "en" && local.length > 0 ? name + '-br' : name.replace("-br", "") // no change in index
  //   return teste
  // }

  const getFlagIcon = (locale) =>
    locale == 'en' ? "/brasil-flag.png" :"/usa-flag.png"

  const getFlagIconAlt = (locale) =>
    locale == 'en' ? "pt-br": "us-en"
      
  return (
    <>
      <Link passHref href={asPath} locale={locale === 'en' ? 'pt' : 'en'} scroll={false}>
        <button aria-label='LangSwitcher' className='p-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer rounded-lg dark:text-gray-100'>

        <Image
          className='h-5 w-5'
          src= {getFlagIcon(locale)}
          width={20}
          height={20}
          alt= {getFlagIconAlt(locale)}/> 
        
        </button>
      </Link>
    </>
  )
}

export default LangSwitcher
