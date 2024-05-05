import { Modal } from "antd";
const { confirm } = Modal;
export default function showDeleteConfirm() {
  return new Promise((resolve, reject) => {
    confirm({
      title: "Are you sure delete this Post?",
      content: "",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        resolve(true);
      },
      onCancel() {
        reject(false);
      },
    });
  });
}
