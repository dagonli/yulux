package com.yulux.inquiry;

/**
 * 询盘处理状态
 */
public enum InquiryStatus {
    /** 新提交，未处理 */
    NEW,
    /** 已联系客户 */
    CONTACTED,
    /** 已关闭 */
    CLOSED
}
