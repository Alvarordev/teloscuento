import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface TeloBreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function TeloBreadcrumbs({ items }: TeloBreadcrumbsProps) {
  return (
    <nav className="flex mb-6 text-xs text-gray-500" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="w-3 h-3 mx-2 text-gray-400" strokeWidth={1.5} />
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-gray-900">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
