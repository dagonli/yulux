package com.yulux.inquiry;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
 * 询盘数据访问层，标准 CRUD 由 MyBatis-Plus BaseMapper 提供
 */
@Mapper
public interface InquiryMapper extends BaseMapper<Inquiry> {
}
