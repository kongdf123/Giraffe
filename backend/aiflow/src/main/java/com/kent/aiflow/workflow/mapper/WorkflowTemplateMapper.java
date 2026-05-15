package com.kent.aiflow.workflow.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.kent.aiflow.workflow.entity.WorkflowTemplateEntity;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface WorkflowTemplateMapper extends BaseMapper<WorkflowTemplateEntity> {
}