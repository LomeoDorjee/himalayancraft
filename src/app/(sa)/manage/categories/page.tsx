import { getCategories } from "@/lib/actions/admin.action"
import { DataTable } from "./table"

export default async function Page() {

  const { data, status } = await getCategories()

  if (status != "") console.log(status)

  return (
    <div className="px-2 py-2 md:px-4">
      <h1 className="widgettitle">Category</h1>
      <DataTable data={data} />
    </div>
  )
}
