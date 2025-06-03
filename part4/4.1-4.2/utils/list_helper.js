const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const dummy = (blogs) => {
  return 1
}

module.exports = {
  dummy,
  totalLikes
}
