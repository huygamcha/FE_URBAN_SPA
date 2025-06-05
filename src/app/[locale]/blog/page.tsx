// app/blog/page.tsx
import Link from 'next/link'
import { ReactNode } from 'react'
import { API_ENDPOINT } from 'src/configs/api'
import AuthLayoutWrapper from 'src/hoc/AuthLayoutWrapper'
import LayoutNotApp from 'src/views/layouts/LayoutNotApp'
import BlogListPage from 'src/views/pages/blog'
import ContactPage from 'src/views/pages/contact'

const getBlogs = async () => {
  const res = await fetch(API_ENDPOINT.SETTING.BLOG.INDEX, {
    // ISR (tái sinh sau 1h nếu có truy cập)
    next: { revalidate: 3600 }
  })

  const data = await res.json()

  return data.data.blogs
}

export default async function Index() {
  const blogs = await getBlogs()

  return (
    <AuthLayoutWrapper
      guestGuard={false}
      authGuard={false}
      getLayout={(page: ReactNode) => <LayoutNotApp>{page}</LayoutNotApp>}
    >
      <BlogListPage blogs={blogs} />
    </AuthLayoutWrapper>
  )
}
