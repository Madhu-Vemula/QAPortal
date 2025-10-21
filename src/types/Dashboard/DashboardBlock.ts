/**
* @interface DashboardBlockProps
* @description Props for a dashboard block component that displays a titled content section.
* Similar to CardSectionProps but typically used specifically in dashboard layouts.
* 
* @property {string} title - The heading text for this dashboard block
* @property {React.ReactNode} children - The content to render within the dashboard block
*/
export interface DashboardBlockProps {
    title: string;
    children: React.ReactNode;
  }