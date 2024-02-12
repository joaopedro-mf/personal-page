export default function filterPublishedPosts({
  posts,
  onlyNewsletter,
  onlyProjects,
  onlyPost,
  onlyHidden,
  onlyProjectsAndPosts
}) {
  if (!posts || !posts.length) return []
  return posts
    .filter((post) =>
      onlyNewsletter
        ? post?.type?.[0] === 'Newsletter'
        : post
    )
    .filter((post) =>
    onlyProjects
      ? post?.type?.[0] === 'Project'
      : post
    )
    .filter((post) =>
      onlyPost
        ? post?.type?.[0] === 'Post'
        : post
    )
    .filter((post) =>
    onlyProjectsAndPosts
      ? post?.type?.[0] === 'Post' || post?.type?.[0] === 'Project'
      : post
    )
    .filter((post) =>
      onlyHidden
        ? post?.type?.[0] === 'Hidden'
        : post?.type?.[0] !== 'Hidden'
    )
    .filter((post) => {
      return (
        post.title &&
        post.slug &&
        post?.status?.[0] === 'Published' &&
        post.date <= new Date()
      )
    })
}
