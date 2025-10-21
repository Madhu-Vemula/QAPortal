/**
 * @type ColumnDefinition
 * @description Configuration for table columns.
 * @template T - Type of data in the table
 * @property {string} header - Column header text
 * @property {keyof T | string} [accessor] - Property accessor for data
 * @property {(row: T) => React.ReactNode} [render] - Custom render function
 */
export type ColumnDefinition<T> = {
    header: string;
    accessor?: keyof T | string;
    render?: (row: T) => React.ReactNode;
  };
  /**
 * @interface CustomTableProps
 * @description Props for custom table component.
 * @template T - Type of data in the table
 * @property {T[]} data - Array of data items
 * @property {ColumnDefinition<T>[]} columns - Column configurations
 * @property {string} [emptyMessage] - Message to display when no data
 */
export interface CustomTableProps<T> {
    data: T[];
    columns: ColumnDefinition<T>[];
    emptyMessage?: string;
  }
  