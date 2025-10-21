import { ApplicationStatus } from "../types/Enums/ApplicationStatus";


export const convertFirstLetterToUpperCase = (value: string): string => 
    value.charAt(0).toUpperCase() + value.slice(1);
export const getStatusClass = (status: ApplicationStatus): string => {
  switch (status) {
    case ApplicationStatus.Approved:
      return 'status-accepted';
    case ApplicationStatus.Rejected:
      return 'status-closed';
    case ApplicationStatus.Pending:
    default:
      return 'status-pending';
  }
};

export const getStatusLabel = (status: ApplicationStatus): string => {
  switch (status) {
    case ApplicationStatus.Approved:
      return 'Approved';
    case ApplicationStatus.Rejected:
      return 'Rejected';
    case ApplicationStatus.Pending:
    default:
      return 'Pending';
  }
};
