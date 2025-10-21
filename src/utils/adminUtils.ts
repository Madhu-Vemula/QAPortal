import { ActionType } from "../types/Enums/ActionType";

export const mapActionTypeToNumber = (actionType: string): number => {
    switch (actionType) {
        case ActionType.APPROVE:
            return 2; 
        case ActionType.REJECT:
            return 3; 
        default:
            return 0; 
    }
};