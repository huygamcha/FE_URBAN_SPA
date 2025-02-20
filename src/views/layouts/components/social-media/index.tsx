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

  // console.log('««««« toggle »»»»»', toggle)

  return (
    <>
      <Box sx={{ cursor: 'pointer', position: 'fixed', bottom: 0, right: 0, zIndex: 9999 }}>
        <Box display='flex' flexDirection='column' mt='0.375rem' mr='1rem'>
          <Box display='flex' flexDirection='column'>
            <Link
              style={{ borderRadius: '1rem', margin: '0.5rem 0px' }}
              target='_blank'
              href='http://pf.kakao.com/_pslkxj'
            >
              <Image
                // sx={{ borderRadius: '1rem' }}
                style={{ borderRadius: '0.2rem' }}
                src='https://cdn.kampa.vn/urban-spa-kakaotalk.svg'
                width={40}
                height={40}
                alt='kakaotalk'
              />
            </Link>
            <Link
              style={{ borderRadius: '1rem', margin: '0.5rem 0px' }}
              target='_blank'
              href='https://api.whatsapp.com/send?phone=84868144408'
            >
              <Image
                style={{ borderRadius: '0.2rem' }}
                src='https://cdn.kampa.vn/urban-spa-what-app.webp'
                width={40}
                height={40}
                alt='what-app'
              />
            </Link>
            <Link style={{ margin: '0.5rem 0px' }} target='_blank' href='https://line.me/ti/p/Vhzjhml6kY'>
              <Image src='https://cdn.kampa.vn/urban-spa-line.svg' width={40} height={40} alt='what-app' />
            </Link>

            {/* <Link style={{ paddingRight: '1rem' }} target='_blank' href='https://cafe.naver.com/vietnamtrip'>
                    <Image src='https://cdn.kampa.vn/urban-spa-fb.webp' width={45} height={45} alt='cafe' />
                  </Link> */}

            <Link style={{ margin: '0.5rem 0px' }} target='_blank' href='https://zalo.me/0868144408'>
              <Image
                src='https://pub-172edbed9e21458e8e1f85de78accde8.r2.dev/Icon_of_Zalo.svg.webp'
                width={40}
                height={40}
                alt='zalo'
              />
            </Link>
          </Box>
          {/* <Box onClick={handleNav}>
            <span aria-hidden='true' className='csaas-svg'>
              <svg viewBox='0 0 52 52' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <ellipse cx='26' cy='26' rx='26' ry='26' fill='#008032'></ellipse>
                <rect
                  width='27.1433'
                  height='3.89857'
                  rx='1.94928'
                  transform='translate(18.35 15.6599) scale(0.998038 1.00196) rotate(45)'
                  fill='white'
                ></rect>
                <rect
                  width='27.1433'
                  height='3.89857'
                  rx='1.94928'
                  transform='translate(37.5056 18.422) scale(0.998038 1.00196) rotate(135)'
                  fill='white'
                ></rect>
              </svg>
            </span>
          </Box> */}
        </Box>
      </Box>
    </>
  )
}
export default SocialMedia
