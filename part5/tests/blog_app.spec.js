const { test, expect, beforeEach, describe } = require('@playwright/test')

const testUser = {
  name: 'Test User',
  username: 'testuser',
  password: 'password',
}

describe('Blog app', () => {
  beforeEach(async ({ request, page }) => {
    await request.post('http://localhost:3003/api/testing/reset')

    await request.post('http://localhost:3003/api/users', {
      data: testUser,
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Log in to application')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByLabel('username').fill(testUser.username)
      await page.getByLabel('password').fill(testUser.password)
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText(`${testUser.name} logged in`)).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByLabel('username').fill(testUser.username)
      await page.getByLabel('password').fill('wrongpassword')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('wrong credentials')).toBeVisible()
      await expect(page.getByText('Log in to application')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.goto('http://localhost:5173')
      await page.getByLabel('username').fill(testUser.username)
      await page.getByLabel('password').fill(testUser.password)
      await page.getByRole('button', { name: 'login' }).click()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()

      await page.getByLabel('title:').fill('Playwright Blog')
      await page.getByLabel('author:').fill('Automation Bot')
      await page.getByLabel('url:').fill('https://e2e.blog')

      await page.getByRole('button', { name: 'create' }).click()

      await expect(page.getByText('Playwright Blog Automation Bot')).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()

      await page.getByLabel('title:').fill('Likeable Blog')
      await page.getByLabel('author:').fill('Liker Person')
      await page.getByLabel('url:').fill('https://like.blog')
      await page.getByRole('button', { name: 'create' }).click()

      await page.getByRole('button', { name: 'view' }).click()

      const likeButton = page.getByRole('button', { name: 'like' })
      await likeButton.click()

      await expect(page.getByText('likes 1')).toBeVisible()
    })

    test('the creator can delete their blog', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.getByLabel('title:').fill('Deletable Blog')
      await page.getByLabel('author:').fill('Blog Destroyer')
      await page.getByLabel('url:').fill('https://delete.me')
      await page.getByRole('button', { name: 'create' }).click()

      await page.getByRole('button', { name: 'view' }).click()

      page.once('dialog', dialog => dialog.accept())

      await page.getByRole('button', { name: 'remove' }).click()

      await expect(page.queryByText('Deletable Blog Blog Destroyer')).not.toBeVisible()
    })


    test('only the creator sees the remove button', async ({ page, request }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.getByLabel('title:').fill('Private Blog')
      await page.getByLabel('author:').fill('User A')
      await page.getByLabel('url:').fill('https://user-a-blog.com')
      await page.getByRole('button', { name: 'create' }).click()

      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByRole('button', { name: 'remove' })).toBeVisible()

      await page.getByRole('button', { name: 'logout' }).click()

      await request.post('http://localhost:3003/api/users', {
        data: {
          name: 'User B',
          username: 'userb',
          password: 'passb',
        },
      })

      await page.getByLabel('username').fill('userb')
      await page.getByLabel('password').fill('passb')
      await page.getByRole('button', { name: 'login' }).click()

      await page.getByRole('button', { name: 'view' }).click()

      const removeButton = page.getByRole('button', { name: 'remove' })
      await expect(removeButton).toBeHidden()
    })

  })
})
