import React from 'react'
import WhatsAppIcon from '../icons/WhatsAppIcon'
import FacebookIcon from '../icons/FacebookIcon'
import InstagramIcon from '../icons/InstagramIcon'

const SocialIcons = () => {
  return (
    <div className='bg-green-900 flex h-12 items-center justify-end'>
        <div className='flex gap-2 mr-6'>
        <WhatsAppIcon size={32}/>
        <FacebookIcon size={32}/>
        <InstagramIcon size={32}/>
        </div>
    </div>
  )
}

export default SocialIcons
