"use client"
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, HomeIcon } from 'lucide-react';
import { dec } from '@/lib/utils';

interface BreadcrumbItemProps {
    href: string;
    text: string;
}

const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({ href, text }) => (
    <li className="inline-flex items-center">
        <Link
            href={href}
            className='text-gray-500 hover:underline capitalize'
        >
            {
                text == "Home"
                    ? (<HomeIcon width={18} height={18} />)
                    : (
                        <>
                            {
                                text.replaceAll("_", " ")
                            }
                        </>
                    )
            }
        </Link>
        <span className="mx-2 text-gray-500">
            <ChevronRight width={20} height={20} />
        </span>
    </li>
);

const Breadcrumbs: React.FC = () => {

    const pathname = usePathname();
    const pathnames = pathname.split('/').filter((x) => x);

    return (
        <nav className="py-3 pl-1 md:pl-2 items-start justify-start">
            <ol className="flex text-sm">
                <BreadcrumbItem href="/" text="Home" />
                {pathnames.map((value, index) => {
                    const href = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathnames.length - 1;
                    return isLast ? (
                        <li key={href} className="inline-flex items-center">
                            <span className="text-gray-500 capitalize">
                                {
                                    value.replaceAll("_", " ").replaceAll("-", " ")
                                }
                            </span>
                        </li>
                    ) : (
                        <BreadcrumbItem key={href} href={href} text={value} />
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
