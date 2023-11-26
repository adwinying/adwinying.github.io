---
draft: false
date: 2023-11-26T16:07:18.000+09:00
tags:
- react
- auth
- tutorial
thumbnail:
title: Handling Auth Access in React
slug: handling-auth-access-in-react
excerpt: Learn how to restrict access to an auth-only route in React.

---

While developing a React app, chances are you probably have routes that are only accessible for users that are logged in. Depending on your routing library of choice, there may be several ways to to restrict access to routes that require auth. If your routing library does not prescribe ways to restrict auth, an `<AuthGuard>` component generally works well regardless of whichever library that you choose:

```tsx
export function AuthGuard({ children }: { children: ReactNode }) {
  // useUser() is a hook that makes a call to the API to get the user's info
  // and caches it. Subsequent calls will reuse the data from the cache.
  //
  // `user` is one of the following type:
  // - undefined: user info is still loading
  // - null: user info is loaded but not found
  // - object: user info is loaded and found
  const user = useUser()

  // react to user state
  useEffect(() => {
    // user is still loading so we do nothing
    if (user === undefined) return

    // user is not found so we redirect to login route
    if (user === null) {
      redirectToAuth()
      return
    }

    // user is found
  }, [user])

  // if user is not loaded or not found we show nothing
  // generally the conditions here should mirror the ones in the above useEffect
  if (user === undefined || user === null) return <></>

  // finally we determined that user is authed then we show the route's contents
  return <>{children}</>
}
```

You would then wrap each restricted route component with `<AuthGuard>`:

```tsx
export function DashboardRoute() {
  return (
    <AuthGuard>
      <DashboardLayout />
    </AuthGuard>
  )
}
```

In most cases, common UI elements such as navigation bars are usually defined outside of routes, which will cause them to be rendered while auth info is still loading. To prevent that from happening, we would need to move the `<AuthGuard>` to as close as the root component as humanely possible, ideally directly under API fetching libraries such as [TanStack Query](https://tanstack.com/query/latest) or [Apollo](https://www.apollographql.com/):

```tsx
export function App() {
  return (
    <ApiLibraryProvider>
      <AuthGuard>
        <RouterOutlet />
      </AuthGuard>
    </ApiLibraryProvider>
  )
}
```

This will effectively mount `<AuthGuard>` regardless of whether the route is public or restricted. To allow access to public routes even without auth, we create another component `<AuthProvider>` which determines whether `<AuthGuard>` should be applied or not:

```tsx
// routes that are accessible regardless of auth status
const PUBLIC_ROUTES = [
  'landing',
]

export function AuthProvider({ children }: { children: ReactNode }) {
  // useRouteName() is a hook that is usually provided by your routing library
  // that returns the current route name
  const routeName = useRouteName()
  const isPublicRoute = PUBLIC_ROUTES.includes(routeName)

  if (isPublicRoute) return <>{children}</>

  return <AuthGuard>{children}</AuthGuard>
}
```

This would take place of the AuthGuard that we used in the root component:

```tsx
export function App() {
  return (
    <ApiLibraryProvider>
      <AuthProvider>
        <RouterOutlet />
      </AuthProvider>
    </ApiLibraryProvider>
  )
}
```

As a bonus, we can create an anti-`<AuthGuard>` component that redirects users when they're logged in, for routes such as the login page:

```tsx
export function UnauthGuard({ children }: { children: ReactNode }) {
  const user = useUser()

  // react to user state
  useEffect(() => {
    // user is still loading so we do nothing
    if (user === undefined) return

    // user is found so we redirect to dashboard route
    if (user) {
      redirectToDashboard()
      return
    }

    // user is not found
  }, [user])

  // if user is not loaded or found we show nothing
  // generally the conditions here should mirror the ones in the above useEffect
  if (user === undefined || user) return <></>

  // finally we determined that user is unauthed then we show the route's contents
  return <>{children}</>
}

```

We can then add an extra conditional to `<AuthProvider>` for unauthed routes:

```tsx
// routes that are accessible regardless of auth status
const PUBLIC_ROUTES = [
  'landing',
]

// routes that are only accessible when unauthed
const UNAUTH_ROUTES = [
  'login'
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const routeName = useRouteName()
  const isPublicRoute = PUBLIC_ROUTES.includes(routeName)
  const isUnauthRoute = UNAUTH_ROUTES.includes(routeName)

  if (isPublicRoute) return <>{children}</>
  if (isUnauthRoute) return <UnauthGuard>{children}</UnauthGuard>

  return <AuthGuard>{children}</AuthGuard>
}
```

Note that `<AuthProvider>` only handles auth checking during page navigations. For session timeouts, you would need to implement separate logic (ideally in the error handler of the API library of your choice).
