package com.kent.aiflow.workflow.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.kent.aiflow.workflow.entity.ApprovalTaskEntity;
import com.kent.aiflow.workflow.vo.PendingTaskVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface ApprovalTaskMapper extends BaseMapper<ApprovalTaskEntity> {

    @Select("""
        SELECT
            at.id AS task_id,
            wr.id AS workflow_id,
            wr.title AS workflow_title,
            u.full_name AS requester_name,
            at.task_status,
            at.created_at
        FROM approval_task at
        LEFT JOIN workflow_request wr ON at.workflow_request_id = wr.id
        LEFT JOIN users u ON wr.requester_id = u.id
        WHERE at.task_status = 'PENDING'
        ORDER BY at.created_at DESC
    """)
    List<PendingTaskVO> selectPendingTasks();
}