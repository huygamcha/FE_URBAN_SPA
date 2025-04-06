import { Box } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import '../../../css/socialMedia.css'

const SocialMedia = () => {
  // const [toggle, setToggle] = useState<boolean>(false)

  // const handleNav = () => {
  //   setToggle(!toggle)
  // }


  return (
    <>
      <Box sx={{ cursor: 'pointer', position: 'fixed', bottom: 0, right: 0, zIndex: 9999 }}>
        <Box display='flex' flexDirection='column' mt='0.375rem' mr='1rem'>
          <Box display='flex' flexDirection='column'>
            <Link style={{ margin: '0.5rem 0px' }} target='_blank' href='http://pf.kakao.com/_pslkxj'>
              <Image
                style={{ borderRadius: '5rem' }}
                src='https://cdn.kampa.vn/urban-spa-kakaotalk.svg'
                width={40}
                height={40}
                alt='kakaotalk'
              />
            </Link>
            <Link
              style={{ margin: '0.5rem 0px' }}
              target='_blank'
              href='https://api.whatsapp.com/send?phone=84868144408'
            >
              <Image
                style={{ borderRadius: '5rem' }}
                src='https://cdn.kampa.vn/urban-spa-what-app.webp'
                width={40}
                height={40}
                alt='what-app'
              />
            </Link>
            <Link style={{ margin: '0.5rem 0px' }} target='_blank' href='https://line.me/ti/p/Vhzjhml6kY'>
              <Image
                style={{ borderRadius: '5rem' }}
                src='https://cdn.kampa.vn/urban-spa-line.svg'
                width={40}
                height={40}
                alt='what-app'
              />
            </Link>

            <Link style={{ margin: '0.5rem 0px' }} target='_blank' href='https://www.facebook.com/hanoiurbanoasisspa'>
              <Image
                style={{ borderRadius: '5rem' }}
                src='https://cdn.kampa.vn/urban-spa-fb.webp'
                width={40}
                height={40}
                alt='fb'
              />
            </Link>

            <Link style={{ margin: '0.5rem 0px' }} target='_blank' href='https://zalo.me/0868144408'>
              <Image
                style={{ borderRadius: '5rem' }}
                src='https://cdn.kampa.vn/urban-spa-zalo.svg.webp'
                width={40}
                height={40}
                alt='zalo'
              />
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  )
}
export default SocialMedia
