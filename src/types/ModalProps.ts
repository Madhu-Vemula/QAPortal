/**
 * @interface ModalProps
 * @description Props for a modal dialog component.
 * 
 * @property {string} title - The title displayed in the modal header
 * @property {string} [logoSrc] - Optional path to a logo image to display in the header
 * @property {() => void} onClose - Callback function invoked when the modal is closed
 * @property {() => any} [onSubmit] - Optional callback function invoked when the submit button is clicked
 * @property {React.ReactNode} children - The content to be rendered inside the modal body
 * @property {boolean} [showFooter] - Optional flag to control visibility of the footer (default: true)
 * @property {string} [submitText] - Optional custom text for the submit button (default: "Submit")
 * @property {string} [cancelText] - Optional custom text for the cancel button (default: "Cancel")
 */
export interface ModalProps {
    title: string,
    logoSrc?: string,
    onClose: () => void,
    onSubmit?: () => any,
    children: React.ReactNode,
    showFooter?: boolean,
    submitText?: string,
    cancelText?: string
  }