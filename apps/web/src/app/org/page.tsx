export default async function Page() {
  if (process.env.NODE_ENV === 'development') {
    await new Promise((resolve) => setTimeout(resolve, 1500))
  }

  return <div>ORG</div>
}
