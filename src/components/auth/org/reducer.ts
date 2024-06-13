import { Org } from "../../../utils/orgUtils";

export type authType = "login" | "register";

type ChangeOrgName = { type: "CHANGE_ORG_NAME"; payload: Org["orgname"] };
type ChnageEmail = { type: "CHANGE_EMAIL"; payload: Org["email"] };
type ChangePassword = { type: "CHANGE_PASSWORD"; payload: Org["password"] };
type ChangeConfirmPassword = {
    type: "CHANGE_CONFIRM_PASSWORD";
    payload: Org["confirmPassword"];
};
type ClearValues = { type: "CLEAR_VALUES" };
type UpdateOrg = { type: "UPDATE_ORG"; payload: Org };

type Action =
    | ChangeOrgName
    | ChnageEmail
    | ChangePassword
    | ChangeConfirmPassword
    | ClearValues
    | UpdateOrg
    ;

export const reducer = (state: Org, action: Action) => {
    switch (action.type) {
        case "CHANGE_ORG_NAME":
            return { ...state, orgname: action.payload };
        case "CHANGE_EMAIL":
            return { ...state, email: action.payload };
        case "CHANGE_PASSWORD":
            return { ...state, password: action.payload };
        case "CHANGE_CONFIRM_PASSWORD":
            return { ...state, confirmPassword: action.payload };
        case "CLEAR_VALUES":
            return {
                id: "",
                orgname: "",
                email: "",
                password: "",
                confirmPassword: "",
            };
        case "UPDATE_ORG":
            return {
                ...state,
                id: action.payload.id,
                orgname: action.payload.orgname,
                email: action.payload.email,
            }
        default:
            return state;
    }
};