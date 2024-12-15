"use client"

import { useState } from "react"
import {
    CaretSortIcon,
    ChevronDownIcon,
    DotsHorizontalIcon,
} from "@radix-ui/react-icons"
import { Cloud, Plus } from "lucide-react"

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Dialog } from "@/components/ui/dialog"
import {
    Sheet,
} from "@/components/ui/sheet"
import {
    Drawer,
} from "@/components/ui/drawer"

import { InputForm } from "./form"
import { deleteProduct, updateProductsFiles } from "@/lib/actions/admin.action"
import toast from "react-hot-toast"
import ImageActions from "./images"
import { InventoryForm } from "./stock"

const FILTER_COLUMN = 'name'

type TableProps = {
    data: TY_Product_Inventory[]
    categories: TY_Category[]
    tags: TY_Tags[]
}

async function deleteData(id: number) {
    const { status } = await deleteProduct(id)
    if (status.toLowerCase() != "success") {
        toast.error("Error: " + status)
        return
    }
    toast.success("Deleted")
}

export function DataTable({ data, categories, tags }: TableProps) {
    const [Defaults, SetDefaults] = useState<TY_Product | null>(null)
    const [selected, setSelected] = useState<TY_Inventory | null>(null)
    const [open, setOpen] = useState<boolean>(false)
    const [openDrawer, setOpenDrawer] = useState<boolean>(false)
    const [sheetOpen, setSheetOpen] = useState<boolean>(false)
    const [imageProductId, setImageProductId] = useState<string>("")

    const columns: ColumnDef<TY_Product_Inventory>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value: any) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "banner",
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Title
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => (
                <div className="capitalize flex align-middle items-center gap-1">
                    <Avatar>
                        <AvatarImage src={row.getValue("banner")} alt="alt" />
                        <AvatarFallback>NA</AvatarFallback>
                    </Avatar>
                    {row.getValue("name")}
                </div>
            ),
        },
        {
            accessorKey: "price",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Price
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                const amount = parseFloat(row.getValue("price"))

                // Format the amount as a dollar amount
                const formatted = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                }).format(amount)

                return <div className="text-center font-medium">{formatted}</div>
            },
        },
        {
            accessorKey: "category",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Category
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => row.getValue("category"),
        },
        {
            accessorKey: "tags",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Tags
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => row.getValue("tags"),
        },
        {
            accessorKey: "stock",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Stock
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                const amount = parseFloat(row.getValue("stock"))

                return <div className="text-center font-medium">{amount}</div>
            },
        },
        {
            accessorKey: "ribbon",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Ribbon
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => (
                <div className="capitalize">
                    {row.getValue("ribbon")}
                </div>
            ),
        },
        {
            accessorKey: "slug",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Slug
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => <div className="lowercase">{row.getValue("slug")}</div>,
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const item = row.original
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <DotsHorizontalIcon className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                                onClick={() => { setImageProductId(item.id + ""); setSheetOpen(true); }}
                                className="text-blue-500"
                            >
                                Images
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => {
                                    setSelected({
                                        productid: item.id + "",
                                        sku: item.sku,
                                        stock: item.stock
                                    });
                                    setOpenDrawer(true);
                                }}
                                className="text-blue-500"
                            >
                                Inventory
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={
                                () => {
                                    SetDefaults({
                                        name: item.name,
                                        description: item.description,
                                        slug: item.slug,
                                        banner: item.banner,
                                        id: parseInt(item.id.toString()),
                                        categoryid: item.categoryid + "",
                                        price: item.price,
                                        ribbon: item.ribbon,
                                        onsale: item.onsale,
                                        discount: item.discount,
                                        discounttype: item.discounttype,
                                        shippinginfo: item.shippinginfo,
                                        tags: item.tags,
                                        size: item.size,
                                        adddescription: item.adddescription
                                    })
                                    setOpen(true)
                                }}
                                className="text-yellow-600"
                            >
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => deleteData(item.id)}
                                className="text-red-600"
                            >
                                Delete
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]

    const [columnVisibility, setColumnVisibility] =
        useState<VisibilityState>({
            description: false,
            banner: false
        })
    const [sorting, setSorting] = useState<SortingState>([])
    const [rowSelection, setRowSelection] = useState({})
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
    )

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        }
    })

    // Update Saved File
    async function updateProductFile() {
        const { status } = await updateProductsFiles()
        toast.success(status)
    }

    return (
        <div className="w-full">
            <Dialog open={open} onOpenChange={setOpen} modal={true}>
                <InputForm defaults={Defaults} setOpen={setOpen} categories={categories} tags={tags} />
            </Dialog>

            <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
                <InventoryForm selected={selected} products={data} setOpen={setOpenDrawer} />
            </Drawer>

            <Sheet open={sheetOpen} onOpenChange={setSheetOpen} modal={true}>
                <ImageActions productId={imageProductId} />
            </Sheet>

            {/* Table Headers */}
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter data..."
                    value={(table.getColumn(FILTER_COLUMN)?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn(FILTER_COLUMN)?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm md:max-w-full mr-1"
                />

                <Button variant="outline" className="md:mx-1 mx-1"
                    onClick={() => {
                        updateProductFile()
                    }}
                >
                    <span className="md:flex hidden">Publish</span> <Cloud />
                </Button>

                <Button variant="outline" className="md:mx-1 mx-1"
                    onClick={() => {
                        SetDefaults(null)
                        setOpen(true)
                    }}
                >
                    <span className="md:flex hidden">Add</span> <Plus />
                </Button>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild >
                        <Button variant="outline" className="ml-1">
                            <span className="md:flex hidden">Columns</span> <ChevronDownIcon className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Table Data */}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Table Footer */}
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>

        </div>
    )
}
