const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

export type InquiryType = "QUOTE" | "LOGO" | "LIGHTBOX" | "CUSTOM_NEON";

export type InquiryPayload = {
  type: InquiryType;
  name: string;
  email: string;
  company?: string;
  country?: string;
  message?: string;
  /** 各表单私有字段 */
  payload?: Record<string, unknown>;
  sourcePage?: string;
};

type ApiResult<T> = {
  ok: boolean;
  data?: T;
  error?: string;
};

/**
 * 提交询盘/表单到后端。文件字段本期不处理。
 */
export async function submitInquiry(
  data: InquiryPayload
): Promise<{ id: number }> {
  const res = await fetch(`${API_BASE}/api/inquiries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
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
