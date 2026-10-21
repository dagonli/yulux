package com.yulux.inquiry;

/**
 * 表单类型
 */
public enum InquiryType {
    /** 通用报价表单 */
    QUOTE("General Quote"),
    /** Logo 霓虹定制询盘 */
    LOGO("Logo Neon Inquiry"),
    /** 灯箱标识询盘 */
    LIGHTBOX("Lightbox Inquiry"),
    /** 在线定制霓虹（加购/询价） */
    CUSTOM_NEON("Online Neon Customizer"),
    /** 商品下单询盘（Order Request） */
    ORDER_REQUEST("Product Order Request");

    private final String label;

    InquiryType(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }
}
