import React from "react";

const FilterContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="filter-container">
            {children}
        </div>
    );
}
export default React.memo(FilterContainer);