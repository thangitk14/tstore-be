import { RouteConfig } from "@medusajs/admin";

const UploadPage = () => {
  return (
    <div>
      This is my upload route
    </div>
  )
}

export const config: RouteConfig = {
  link: {
    label: "Tải lên",
    icon: null,
  },
}
export default UploadPage;