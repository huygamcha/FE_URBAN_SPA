import { Box } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

const SocialMedia = () => {
  const icons = [
    {
      href: 'http://pf.kakao.com/_pslkxj',
      src: 'https://cdn.kampa.vn/urban-spa-kakaotalk.svg',
      alt: 'kakaotalk'
    },
    {
      href: 'https://api.whatsapp.com/send?phone=84868144408',
      src: 'https://cdn.kampa.vn/urban-spa-what-app.webp',
      alt: 'whatsapp'
    },
    {
      href: 'https://line.me/ti/p/Vhzjhml6kY',
      src: 'https://cdn.kampa.vn/urban-spa-line.svg',
      alt: 'line'
    },
    {
      href: 'https://www.facebook.com/hanoiurbanoasisspa',
      src: 'https://cdn.kampa.vn/urban-spa-fb.webp',
      alt: 'facebook'
    },
    {
      href: 'https://zalo.me/0868144408',
      src: 'https://cdn.kampa.vn/urban-spa-zalo.svg.webp',
      alt: 'zalo'
    }
  ]

  return (
    <Box sx={{ cursor: 'pointer', position: 'fixed', bottom: 0, right: 0, zIndex: 9999 }}>
      <Box display='flex' flexDirection='column' mt='0.375rem' mr='1rem'>
        {icons.map((icon, index) => (
          <Link key={index} href={icon.href} target='_blank' style={{ margin: '0.5rem 0px' }}>
            <Box
              sx={{
                position: 'relative',
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {/* Pulse circle background */}
              <Box
                sx={{
                  position: 'absolute',
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  zIndex: 0,
                  animation: 'pulseCircle 1s ease-out infinite',
                  '@keyframes pulseCircle': {
                    '0%': {
                      transform: 'scale(1)',
                      opacity: 1
                    },
                    '100%': {
                      transform: 'scale(2.2)',
                      opacity: 0
                    }
                  }
                }}
              />
              {/* Actual icon */}
              <Image src={icon.src} alt={icon.alt} width={40} height={40} style={{ borderRadius: '50%', zIndex: 1 }} />
            </Box>
          </Link>
        ))}
      </Box>
    </Box>
  )
}

export default SocialMedia
