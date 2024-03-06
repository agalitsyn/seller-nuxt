import { userMock } from '~/mock'

export default defineNuxtRouteMiddleware(async (to, _) => {
  const user = useUser()
  if (!user.value) {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    user.value = Object.assign({}, userMock)
  } else {
    // TODO: check if token expired and refresh
  }

  if (!user.value && to.fullPath !== '/login') {
    return {
      path: '/login',
      query: { redirect: to.fullPath }
    }
  } else if (user.value && to.fullPath === '/login') {
    return {
      path: '/'
    }
  }
})
