import { ReactNode } from 'react'
import AuthLayoutWrapper from 'src/hoc/AuthLayoutWrapper'

// layouts
import LayoutNotApp from 'src/views/layouts/LayoutNotApp'
import { Metadata } from 'next'
import { API_ENDPOINT } from 'src/configs/api'
import { notFound } from 'next/navigation'
import DetailBlogPage from 'src/views/pages/blog/components/DetailBlogPage'

const getDetailBlog = async (slug: string) => {
  try {
    const res = await fetch(`${API_ENDPOINT.SETTING.BLOG.SLUG}/${slug}`, {
      // ISR: tự động regenerate sau 60 giây nếu có truy cập
      next: {
        revalidate: 60
      }
    })

    const data = await res.json()

    return data?.data || null
  } catch (error) {
    return null
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params
  const detailBlog = await getDetailBlog(slug)

  if (!detailBlog) return notFound()

  return (
    <AuthLayoutWrapper
      guestGuard={false}
      authGuard={false}
      getLayout={(page: ReactNode) => <LayoutNotApp>{page}</LayoutNotApp>}
    >
      <DetailBlogPage detailBlog={detailBlog} />
    </AuthLayoutWrapper>
  )
}

export const generateMetadata = async ({ params }: { params: { slug: string; locale: string } }): Promise<Metadata> => {
  const blog = await getDetailBlog(params.slug)

  if (!blog) {
    return {
      title: 'Không tìm thấy bài viết',
      description: 'Bài viết không tồn tại hoặc đã bị xoá.'
    }
  }

  const locale = params?.locale || 'vi'

  return {
    title: 'Blog',
    description: blog.description || 'Spa cao cấp, thư giãn và làm đẹp',
    openGraph: {
      title: blog.name,
      description: blog.description || '',
      url: `https://cdn.kampa.vn/blog/${params.slug}`,
      type: 'article',
      images: [
        {
          url: 'https://cdn.kampa.vn/opengraph.png',
          width: 1200,
          height: 630
        }
      ]
    }
  }
}

// export async function generateStaticParams() {
//   const posts = await fetch(API_ENDPOINT.SETTING.BLOG.INDEX).then(res => res.json())

//   return posts.data.blogs.map((post: any) => ({
//     slug: post.slug
//   }))
// }

// giúp gọi blog theo slug chưa có trong lúc build
export const dynamicParams = true
