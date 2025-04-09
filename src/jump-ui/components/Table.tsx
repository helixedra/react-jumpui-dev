import React from "react";

// Table context to share state between components
const TableContext = React.createContext<{ striped?: boolean }>({});

// Root Table component
interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  striped?: boolean;
  hover?: boolean;
  bordered?: boolean;
  compact?: boolean;
  children: React.ReactNode;
}

const Table = ({
  striped = false,
  hover = false,
  bordered = false,
  compact = false,
  className = "",
  children,
  ...props
}: TableProps) => {
  const classes = [
    "w-full text-sm",
    hover
      ? "hover:table-hover [&_tbody_tr]:hover:bg-gray-50 [&_tbody_tr]:hover:dark:bg-gray-800/50"
      : "",
    bordered
      ? "border-collapse [&_th]:border [&_td]:border [&_th]:border-gray-200 [&_td]:border-gray-200 dark:[&_th]:border-gray-700 dark:[&_td]:border-gray-700"
      : "",
    compact
      ? "table-condensed [&_th]:py-2 [&_td]:py-2 [&_th]:px-3 [&_td]:px-3"
      : "[&_th]:p-4 [&_td]:p-4",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <TableContext.Provider value={{ striped }}>
      <div className="overflow-x-auto relative">
        <table className={classes} {...props}>
          {children}
        </table>
      </div>
    </TableContext.Provider>
  );
};

// Table Header component
interface TheadProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
}

const Thead = ({ className = "", children, ...props }: TheadProps) => {
  const classes = [
    "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium text-left uppercase",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <thead className={classes} {...props}>
      {children}
    </thead>
  );
};

// Table Body component
interface TbodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
}

const Tbody = ({ className = "", children, ...props }: TbodyProps) => {
  const { striped } = React.useContext(TableContext);

  const classes = [
    striped
      ? "[&_tr:nth-child(even)]:bg-gray-50 [&_tr:nth-child(even)]:dark:bg-gray-800/30"
      : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <tbody className={classes} {...props}>
      {children}
    </tbody>
  );
};

// Table Row component
interface TrProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode;
}

const Tr = ({ className = "", children, ...props }: TrProps) => {
  return (
    <tr
      className={`border-b border-gray-200 dark:border-gray-700 ${className}`}
      {...props}
    >
      {children}
    </tr>
  );
};

// Table Header Cell component
interface ThProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
}

const Th = ({ className = "", children, ...props }: ThProps) => {
  const classes = ["font-semibold whitespace-nowrap", className]
    .filter(Boolean)
    .join(" ");

  return (
    <th className={classes} {...props}>
      {children}
    </th>
  );
};

// Table Data Cell component
interface TdProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
}

const Td = ({ className = "", children, ...props }: TdProps) => {
  return (
    <td className={`dark:text-gray-300 ${className}`} {...props}>
      {children}
    </td>
  );
};

// Custom Row for empty state
interface EmptyRowProps {
  colSpan: number;
  message?: string;
}

const EmptyRow = ({
  colSpan,
  message = "No data available",
}: EmptyRowProps) => {
  return (
    <tr>
      <td
        colSpan={colSpan}
        className="text-center py-6 text-gray-500 dark:text-gray-400"
      >
        {message}
      </td>
    </tr>
  );
};

// Export as compound components
Table.Thead = Thead;
Table.Tbody = Tbody;
Table.Tr = Tr;
Table.Th = Th;
Table.Td = Td;
Table.EmptyRow = EmptyRow;

export { Table };
