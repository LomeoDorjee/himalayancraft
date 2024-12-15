import { getCategories } from "@/lib/actions/admin.action"

export default async function Page() {

  const { data, status } = await getCategories()

  if (status != "") console.log(status)

  return (
    <div className="px-2 py-2 md:px-4">

    </div>
  )
}
