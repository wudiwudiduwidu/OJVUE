import accessEUMN from "@/access/accessEUMN";

/**
 *
 * @param role 当前用户权限
 * @param access 需要什么权限
 */
const checkAccess = (role: any, access: any) => {
  if (access === accessEUMN.USER) {
    if (role === accessEUMN.NOT_LOGIN) return false;
  }
  if (access === accessEUMN.ADMIN) {
    if (role !== accessEUMN.ADMIN) return false;
  }
  return true;
};
export default checkAccess;
