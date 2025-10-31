import { useEffect } from "react"
import type { DashboardBlockProps } from "../../types/Dashboard/DashboardBlock"
import useSubscribeToNotification from "../../hooks/useSubscribeToNotification";

const DashboardBlock: React.FC<DashboardBlockProps> = ({ title, children }) => {
    const subscribeToNotification = useSubscribeToNotification();
    useEffect(() => {
        subscribeToNotification();
    }, []);

    return (
        <div className="dashboard-block-container">
            <h1>{title}</h1>
            {children}
        </div>
    )
}

export default DashboardBlock