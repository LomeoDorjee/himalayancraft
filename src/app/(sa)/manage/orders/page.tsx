import { getOrders } from "@/lib/actions/admin.action"
// import { DataTable } from "./table"
import { format } from "timeago.js"
import { currencyFormat } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Dialog } from "@/components/ui/dialog"
import { InputForm } from "./form"
import { DataTable } from "./table"


const MyOrders = async ({ searchParams }: { searchParams: any }) => {

  const orderId = searchParams?.orderId ? searchParams.orderId : 0
  const refresh = searchParams?.refresh ? searchParams.refresh : false

  const data: {
    data: TY_OrderDetails[],
    status: string
  } = await getOrders()

  if (data.status != "") console.log(data.status)

  return (
    <div className="px-2 py-2 md:px-4">
      <h1 className="widgettitle">Mangage Orders</h1>

      <InputForm orderId={orderId} refresh={refresh} />

      {/* Orders */}
      <DataTable data={data.data} searchParams={searchParams} />
    </div>
  )
}

export default MyOrders