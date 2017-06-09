var API_HOST = window.sessionStorage.getItem('FRAMEWORK_SERVER_BASE_URL') + "/rest/1.0/admin/" + window.sessionStorage.getItem('appName');
export var API_CONSTANTS = {
    GET_ALL_ROLES: API_HOST + "/roles",
    POST_ADD_ROLE: API_HOST + "/role",
    PUT_ROLE_INFO: API_HOST + "/role/:roleId",
    DELETE_ROLE: API_HOST + "/role/:roleId",
    GET_ROLE_INFO: API_HOST + "/role/:roleId/features",
    GET_TIMEZONE: API_HOST + "/user/timezone",
    PUT_TIMEZONE: API_HOST + "/user/settimezone",
    GET_PUA_REQUEST: API_HOST + "/pending-access-request",
    GET_USER_ASSIGNED_ROLES: API_HOST + "/user/hasRoles",
    GET_USER_ACCESS_REQUEST: API_HOST + "/access-request",
    GET_USER_BY_NAME: API_HOST + "/search-user?userid=",
    GET_USER_BY_ROLE: API_HOST + "/role/:roleId/users",
    EXPORT_BY_NAME: API_HOST + "/users/export?userid=",
    EXPORT_BY_ROLE: API_HOST + "/role/:roleId/users/export",
    POST_USER_ACCESS_REQUEST: API_HOST + "/user/:username/department/:department/access-request",
    POST_PUA_REQUEST: API_HOST + "/access-request",
    GET_FILE_DOWNLOAD: API_HOST + "/users/export/sample",
    UPDATE_USER_ROLES: API_HOST + "/role/udpateUserRoles",
    USER_IMPORT_PREVIEW: API_HOST + "/users/import/preview",
    USER_IMPORT: API_HOST + "/users/import",
    //GET_ALL_FEATURES: API_HOST + "/roles/all/features",
    //PUT_EDIT_ROLE: API_HOST + "/roles/:roleId/pageId/rolePageId/roles",
    //GET_USER_ACCESS: API_HOST + "/roles/userAccessRights" ,
    POST_ASSIGN_THEME_USERS: API_HOST + "/themes",
    GET_ROLES_FEATURE: API_HOST + "/roles/feature",
    GET_USERS_BY_ROLE: API_HOST + "/users/role/:roleId"
};
//# sourceMappingURL=C:/cox_repo/cox_core-ui-framework_repo/projects/core-cli/core-services-util/src/components/common-components/properties/api-constants.js.map