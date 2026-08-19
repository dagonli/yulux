import type { Field } from "@/components/forms/InquiryForm";

/**
 * Order Request 询价表单字段定义。
 *
 * 字段分流规则（见 InquiryForm 的 COMMON_KEYS）：
 * - name / email / country / address → 顶级 InquiryRequest 列（address 即收货地址）
 * - quantity / size / color / powerSupply / tube → payload JSON
 *
 * productSlug 由 OrderRequestForm 注入隐藏字段，同样落入 payload，
 * 供后台关联具体商品，不在表单可见区显示。
 */
export const ORDER_REQUEST_FORM_FIELDS: Field[] = [
  { id: "name", label: "Name", type: "text", required: true },
  { id: "email", label: "Email", type: "email", required: true },
  { id: "country", label: "Country", type: "text", required: true },
  { id: "quantity", label: "Quantity", type: "number", required: true, defaultValue: "1" },
  {
    id: "size",
    label: "Selected Size",
    type: "select",
    required: true,
    options: ["40cm", "60cm", "80cm"],
  },
  {
    id: "color",
    label: "Selected Color",
    type: "select",
    required: true,
    options: ["Warm White", "Pink"],
  },
  {
    id: "powerSupply",
    label: "Power Supply",
    type: "select",
    required: true,
    options: ["US", "EU", "UK"],
  },
  {
    id: "tube",
    label: "Selected Tube",
    type: "select",
    required: true,
    options: ["White Tube", "Color matching Tube"],
  },
  {
    id: "address",
    label: "Shipping Address",
    type: "text",
    required: true,
    fullWidth: true,
    placeholder: "Street address, city, state/province, postal code",
  },
];

/** Order Request 页面 SEO meta */
export const ORDER_REQUEST_META = {
  title: "Order Request | Yulux Sign",
  description:
    "Submit an order request for your chosen neon sign. Confirm size, color, power supply, tube type and shipping address — we'll confirm details and payment by email within 24 hours.",
};
