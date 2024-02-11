// https://react-svgr.com/playground/
import  * as React from 'react'
import Image from 'next/image'

const Avatar = () => (
  (
    <Image
      src="/landing-avatar.gif"
      width={500}
      height={500}
      alt="Picture of the author"
    />
  )

)

export default Avatar
