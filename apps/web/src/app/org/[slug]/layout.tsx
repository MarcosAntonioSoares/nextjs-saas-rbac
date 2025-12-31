import { OrgBoundary } from '@/components/org-boundary'
import { getMembership } from '@/http/get-membership'
import { updateOrganizationAccess } from '@/http/update-organization-access'
import { redirect } from 'next/navigation'

interface OrgSlugLayoutProps {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}

export default async function OrgSlugLayout({
  children,
  params,
}: OrgSlugLayoutProps) {
  const { slug } = await params

  let membership

  try {
    membership = await getMembership(slug)
    await updateOrganizationAccess(slug)
  } catch {
    redirect('/org')
  }

  return (
    <OrgBoundary slug={slug} membership={membership.membership}>
      {children}
    </OrgBoundary>
  )
}
