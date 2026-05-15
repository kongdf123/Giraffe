package com.kent.aiflow.workflow.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.kent.aiflow.workflow.entity.WorkflowRequestEntity;
import com.kent.aiflow.workflow.vo.WorkflowRequestVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface WorkflowRequestMapper extends BaseMapper<WorkflowRequestEntity> {

    @Select("""
        SELECT
            wr.id,
            wr.title,
            wr.status,
            u.full_name AS requester_name,
            wt.name AS template_name
        FROM workflow_request wr
        LEFT JOIN users u ON wr.requester_id = u.id
        LEFT JOIN workflow_template wt ON wr.template_id = wt.id
        ORDER BY wr.created_at DESC
    """)
    List<WorkflowRequestVO> selectWorkflowList();
}