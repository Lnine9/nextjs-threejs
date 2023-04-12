export enum MenuPath {
  HOME = "",
  DOC = "doc",
  PROJECT = "project",
  DOC_COMP = "docComp",
}

export const Menus = [
  {
    path: MenuPath.HOME,
    title: "首页",
  },
  {
    path: MenuPath.DOC,
    title: "POST",
  },
  {
    path: MenuPath.DOC_COMP,
    title: "组件",
  },
  {
    path: MenuPath.PROJECT,
    title: "项目",
  },
];
