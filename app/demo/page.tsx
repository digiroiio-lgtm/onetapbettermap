import { redirect } from 'next/navigation'

export default function DemoPage() {
  redirect('/results?businessName=Demo%20Business&city=London&keyword=dentist%20near%20me')
}
