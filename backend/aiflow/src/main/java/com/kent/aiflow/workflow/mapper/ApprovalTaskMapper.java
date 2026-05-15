package com.kent.aiflow.workflow.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.kent.aiflow.workflow.entity.ApprovalTaskEntity;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ApprovalTaskMapper extends BaseMapper<ApprovalTaskEntity> {
}