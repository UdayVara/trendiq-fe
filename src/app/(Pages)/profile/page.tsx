import type { Metadata } from "next"
import ProfilePage from "./_components/ProfilePage"

export const metadata: Metadata = {
  title: "My Profile",
  description: "View and manage your profile information",
}

export default function Profile() {
  return <ProfilePage />
}

