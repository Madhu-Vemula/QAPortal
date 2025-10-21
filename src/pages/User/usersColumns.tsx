import type { ColumnDefinition } from "../../types/customTableProps";
import { RoleType } from "../../types/Enums/RoleType";
import type { UserData } from "../../types/User/user";

/**
 * @function getEmployeeColumns
 * @description Generates column configurations for an employee management table with edit/remove actions
 * 
 * @param {(employee: Employee) => void} handleEditEmployee - Callback function triggered when edit button is clicked
 * @param {(employee: Employee) => Promise<void>} handleRemoveEmployee - Async callback function triggered when remove button is clicked
 * 
 * @returns {ColumnDefinition<Employee>[]} Array of column configurations for the employee table
 */
export const getUsersColumns = (handleEditUser: (row:UserData) => void, handleDeleteUser: (row:UserData) => void
): ColumnDefinition<UserData>[] => {
    /**
     * @constant baseColumns
     * @type {ColumnDefinition<Employee>[]}
     * @description Base column configuration for employee table containing:
     * - Employee ID, Name, Email, Role (formatted), and Manager Email
     * - Action buttons for editing and removing employees
     */
    const baseColumns: ColumnDefinition<UserData>[] = [
        {
            header: 'Email',
            accessor: 'email'
        },
        {
            header: 'FirstName',
            accessor: 'firstName'
        },
        {
            header: 'LastName',
            accessor: 'lastName'
        },
        {
            header: 'User Role',
            accessor: 'role',
            render: (row) => RoleType[row.role]
        },
        {
            header: 'Edit',
            accessor: '',
            render: (row) => (
                <button
                    onClick={() => handleEditUser(row)}
                    className="button edit-btn"
                    aria-label={`Edit User ${row.firstName}`}
                >
                    Edit
                </button>
            )
        },
        {
            header: 'Remove',
            accessor: '',
            render: (row) => (
                <button
                    onClick={() => handleDeleteUser(row)}
                    className="button remove-btn"
                    aria-label={`Remove employee ${row.firstName}`}
                >
                    Remove
                </button>
            )
        }
    ];

    return baseColumns;
};