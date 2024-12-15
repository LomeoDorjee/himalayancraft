"use client"

import { useState } from "react"
import {
    CaretSortIcon,
    ChevronDownIcon,
    DotsHorizontalIcon,
} from "@radix-ui/react-icons"
import { Plus } from "lucide-react"

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
import { InputForm } from "./form"
import { deleteCategory } from "@/lib/actions/admin.action"
import toast from "react-hot-toast"

const FILTER_COLUMN = 'title'

type TableProps = {
    data: TY_Category[]
}

async function deleteData(id: number) {
    const { status } = await deleteCategory(id)
    if (status.toLowerCase() != "success") {
        toast.error("Error: " + status)
        return
    }
    toast.success("Deleted")
}

export function DataTable({ data }: TableProps) {
    const [Defaults, SetDefaults] = useState<TY_Category | null>(null)
    const [open, setOpen] = useState<boolean>(false)

    const columns: ColumnDef<TY_Category>[] = [
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
            accessorKey: "title",
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
                        <AvatarImage src={row.getValue("banner") ?? "https://github.com/shadcn.png"} alt="catdp" />
                        <AvatarFallback>NA</AvatarFallback>
                    </Avatar>
                    {row.getValue("title")}
                </div>
            ),
        },
        {
            accessorKey: "description",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Description
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => <div className="lowercase">{row.getValue("description")}</div>,
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
        // {
        //     accessorKey: "amount",
        //     header: () => <div className="text-right">Amount</div>,
        //     cell: ({ row }) => {
        //         const amount = parseFloat(row.getValue("amount"))

        //         // Format the amount as a dollar amount
        //         const formatted = new Intl.NumberFormat("en-US", {
        //             style: "currency",
        //             currency: "USD",
        //         }).format(amount)

        //         return <div className="text-right font-medium">{formatted}</div>
        //     },
        // },
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
                            <DropdownMenuItem onClick={
                                () => {
                                    SetDefaults({
                                        title: item.title,
                                        description: item.description,
                                        slug: item.slug,
                                        banner: item.banner,
                                        id: item.id,
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

    return (
        <div className="w-full">
            <Dialog open={open} onOpenChange={setOpen} modal={true}>
                <InputForm defaults={Defaults} setOpen={setOpen} />
            </Dialog>

            {/* Table Headers */}
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter data..."
                    value={(table.getColumn(FILTER_COLUMN)?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn(FILTER_COLUMN)?.setFilterValue(event.target.value)
                    }
                    className="max-w-xs md:max-w-full"
                />

                <Button variant="outline" className="mx-2"
                    onClick={() => {
                        SetDefaults(null)
                        setOpen(true)
                    }}
                >
                    Add <Plus />
                </Button>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
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
