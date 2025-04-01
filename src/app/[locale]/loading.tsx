'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const LoadingComponent = () => {
  return (
    <div
      style={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff'
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '150px',
          height: '150px'
        }}
      >
        {/* Animated Expanding Circle */}
        <motion.div
          style={{
            position: 'absolute',
            top: '0%',
            left: '0%',
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            backgroundColor: '#ddd',
            transform: 'translate(-50%, -50%)',
            zIndex: 1
          }}
          animate={{
            scale: [1, 1.5, 2],
            opacity: [1, 0.5, 0]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear'
          }}
        />

        {/* Static Image in Center */}
        <div
          style={{
            position: 'absolute',
            top: '0%',
            left: '0%',
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            overflow: 'hidden',
            backgroundColor: '#ffffff',
            zIndex: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Image
            src='https://spa.nacomcorp.com/_next/image?url=https%3A%2F%2Fcdn.kampa.vn%2Furban-oasis-spa-logo.png&w=256&q=75'
            alt='Urban Oasis Spa Logo'
            width={80}
            height={80}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain'
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default LoadingComponent
