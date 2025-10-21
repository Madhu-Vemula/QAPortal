import type { ChangeEvent } from "react";
import type { PendingAdmin } from "../../types/Admin/PendingAdmin";
import type { ColumnDefinition } from "../../types/customTableProps";
import { ActionType } from "../../types/Enums/ActionType"

/**
 * @function getEmployeeColumns
 * @description Generates column configurations for an employee management table with edit/remove actions
 * 
 * @param {(employee: Employee) => void} handleEditEmployee - Callback function triggered when edit button is clicked
 * @param {(employee: Employee) => Promise<void>} handleRemoveEmployee - Async callback function triggered when remove button is clicked
 * 
 * @returns {ColumnDefinition<Employee>[]} Array of column configurations for the employee table
 */
export const getPendingAdminsColumns = (
    handleModifyAdmin: (e: ChangeEvent<HTMLSelectElement>, item: PendingAdmin) => void
): ColumnDefinition<PendingAdmin>[] => {
    /**
     * @constant baseColumns
     * @type {ColumnDefinition<Employee>[]}
     * @description Base column configuration for employee table containing:
     * - Employee ID, Name, Email, Role (formatted), and Manager Email
     * - Action buttons for editing and removing employees
     */
    
    const baseColumns = [
        {
            header: 'FirstName',
            accessor: 'firstName',
        },
        {
            header: 'LastName',
            accessor: 'lastName'
        },
        {
            header: 'CreatedAt',
            accessor: 'createdAt',
            render: (item: PendingAdmin) => new Date(item.createdAt).toLocaleDateString()
        },
        {
            header: 'Reason',
            accessor: 'reason'
        },
        {
            header: 'Edit',
            accessor: '',
            render: (item:PendingAdmin) => (
                <button
                    type="button"
                    title="actions"
                    className="button submit-btn action-btn"
                >
                    <select
                        name="actions"
                        title="actions"
                        value=""
                        onChange={(e) => handleModifyAdmin(e, item)}
                    >
                        <option value="">Actions</option>
                        <option value={ActionType.APPROVE}>Approve</option>
                        <option value={ActionType.REJECT}>Reject</option>
                    </select>
                </button>
            ),
        }
        // {
        //     header: 'Remove',
        //     accessor: '',
        //     render: (row) => (
        //         <button
        //             onClick={() => handleRemoveEmployee(row)}
        //             className="button remove-btn"
        //             aria-label={`Remove employee ${row.firstName}`}
        //         >
        //             Remove
        //         </button>
        //     )
        // }
    ];

    return baseColumns;
};