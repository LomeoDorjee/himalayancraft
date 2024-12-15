import { getCategories, getProducts, getTags } from "@/lib/actions/admin.action"
import { DataTable } from "./table"
import Categories from "@/constants/categoriesConstant"
import Tags from "@/constants/tagsConstant"

export default async function Page() {

  const { data, status } = await getProducts()

  if (status != "") console.log(status)

  // Load Categories
  const categories = Categories

  // Load Tags
  const tags = Tags


  return (
    <div className="px-2 py-2 md:px-4">
      <h1 className="widgettitle">Manage Products</h1>
      <DataTable data={data} categories={categories} tags={tags} />
    </div>
  )
}
