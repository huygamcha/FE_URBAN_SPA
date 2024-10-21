### 1.dynamic: cấu hình cho việc ssr trong app router
// getStaticProps getServerSideProps  Incremental static regeneration

# auto: mặc định, Next.js sẽ tự động quyết định cách kết xuất nội dung, ưu tiên kết xuất tĩnh khi có thể

# force-dynamic: Next.js luôn kết xuất nội dung động cho mỗi yêu cầu của người dùng (getServerSideProps)

# force-static: kết xuất nội dung tĩnh và lưu trữ dữ liệu trong bộ nhớ cache (getStaticProps)

# error: tương tự force-static nhưng khác là Next.js sẽ báo lỗi

### 2.maxDuration: thời gian tối đa cho phép thực thi logic ở server (second)

### 3.revalidate: (ISR) Incremental static regeneration => false | 0 | number

### 4.runtime 
## nodejs
## edge (Vercel Edge Platform)
Tính năng	            Node.js Runtime	                             Edge Runtime
Môi trường thực thi	Node.js	                                   Môi trường nhẹ hơn
Hiệu suất	            Tốt cho các web truyền thống	                 Cao hơn và thời gian tải trang nhanh hơn
Khả năng tương thích	Rộng rãi	                                   Hạn chế hơn
Nền tảng triển khai	máy chủ web truyền thống	                 Nền tảng tính toán biên

### 5.dynamicParams => true | false
