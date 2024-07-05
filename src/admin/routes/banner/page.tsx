import { RouteConfig } from "@medusajs/admin";

const BannerPage = () => {
  return (
    <div>
      This is my banner route
    </div>
  )
}

export const config: RouteConfig = {
  link: {
    label: "Cài đặt banner",
    icon: null,
  },
}
export default BannerPage;