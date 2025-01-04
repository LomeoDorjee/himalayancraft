"use client"

import { useState } from "react"
import {
    CaretSortIcon,
    ChevronDownIcon,
    DotsHorizontalIcon,
} from "@radix-ui/react-icons"
import { Cloud } from "lucide-react"

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

import { Dialog } from "@/components/ui/dialog"
import { InputForm } from "./form"
import { updateFooterFile } from "@/lib/actions/admin.action"
import toast from "react-hot-toast"

const FILTER_COLUMN = 'address1'

type TableProps = {
    data: TY_Footer[]
}

export function DataTable({ data }: TableProps) {
    const [Defaults, SetDefaults] = useState<TY_Footer | null>(null)
    const [open, setOpen] = useState<boolean>(false)

    const columns: ColumnDef<TY_Footer>[] = [
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
            accessorKey: "address1",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Address 1
                    </Button>
                )
            },
            cell: ({ row }) => (
                <div className=" flex align-middle items-center gap-1">
                    {row.getValue("address1")}
                </div>
            ),
        },
        {
            accessorKey: "address2",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Address 2
                    </Button>
                )
            },
            cell: ({ row }) => (
                <div className=" flex align-middle items-center gap-1">
                    {row.getValue("address2")}
                </div>
            ),
        },
        {
            accessorKey: "supportemail",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Email
                    </Button>
                )
            },
            cell: ({ row }) => (
                <div className=" flex align-middle items-center gap-1">
                    {row.getValue("supportemail")}
                </div>
            ),
        },
        {
            accessorKey: "phone",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Phone
                    </Button>
                )
            },
            cell: ({ row }) => (
                <div className=" flex align-middle items-center gap-1">
                    {row.getValue("phone")}
                </div>
            ),
        },
        {
            accessorKey: "fb",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Link
                    </Button>
                )
            },
            cell: ({ row }) => (
                <div className=" flex align-middle items-center gap-1">
                    {row.getValue("fb")} ..
                </div>
            ),
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
                            <DropdownMenuItem onClick={
                                () => {
                                    SetDefaults({
                                        id: item.id,
                                        address1: item.address1,
                                        address2: item.address2,
                                        supportemail: item.supportemail,
                                        phone: item.phone,
                                        x: item.x,
                                        fb: item.fb,
                                        ig: item.ig,
                                        yt: item.yt,
                                    })
                                    setOpen(true)
                                }}
                                className="text-yellow-600"
                            >
                                Edit
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
    async function updateFootersFile() {
        const { status } = await updateFooterFile()
        if (status != "") {
            toast.error(status)
            return
        }
        toast.success(status)
    }

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
                    className="max-w-xs md:max-w-full mr-1"
                />

                <Button variant="outline" className="md:mx-2 mx-1"
                    onClick={() => {
                        updateFootersFile()
                    }}
                >
                    <span className="md:flex hidden">Publish</span> <Cloud />
                </Button>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
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
                                        className=""
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
