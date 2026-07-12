package com.yulux.common;

import lombok.Data;

/**
 * 统一 API 响应包装
 */
@Data
public class ApiResult<T> {

    private boolean ok;
    private T data;
    private String error;

    public static <T> ApiResult<T> success(T data) {
        ApiResult<T> r = new ApiResult<>();
        r.setOk(true);
        r.setData(data);
        return r;
    }

    public static <T> ApiResult<T> fail(String error) {
        ApiResult<T> r = new ApiResult<>();
        r.setOk(false);
        r.setError(error);
        return r;
    }
}
