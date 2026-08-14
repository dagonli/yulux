const API_BASE =
  typeof window === "undefined"
    ? (process.env.API_URL ?? "http://localhost:8080")
    : (process.env.NEXT_PUBLIC_API_URL ?? "");

export type InquiryType = "QUOTE" | "LOGO" | "LIGHTBOX" | "CUSTOM_NEON";

export type InquiryPayload = {
  type: InquiryType;
  name: string;
  email: string;
  company?: string;
  country?: string;
  phone?: string;
  address?: string;
  message?: string;
  /** 各表单私有字段 */
  payload?: Record<string, unknown>;
  sourcePage?: string;
  /** 可选附件（图片 / PDF / 设计稿等），随表单一起上传 */
  file?: File | null;
};

type ApiResult<T> = {
  ok: boolean;
  data?: T;
  error?: string;
};

/**
 * 提交询盘/表单到后端（multipart/form-data）。
 * data 部分为 JSON 字符串，file 为可选附件；后端落盘保存并可在后管下载。
 */
export async function submitInquiry(
  data: InquiryPayload
): Promise<{ id: number }> {
  const { file, ...fields } = data;

  const form = new FormData();
  form.append(
    "data",
    new Blob([JSON.stringify(fields)], { type: "application/json" })
  );
  if (file) {
    form.append("file", file, file.name);
  }

  const res = await fetch(`${API_BASE}/api/inquiries`, {
    method: "POST",
    // 不手动设置 Content-Type，浏览器会自动带 multipart boundary
    body: form,
  });

  let body: ApiResult<{ id: number }> | null = null;
  try {
    body = (await res.json()) as ApiResult<{ id: number }>;
  } catch {
    // 忽略解析错误，走下方统一失败分支
  }

  if (!res.ok || !body?.ok) {
    throw new Error(body?.error ?? `Request failed (${res.status})`);
  }

  return body.data ?? { id: 0 };
}
