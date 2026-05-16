package com.kent.aiflow.workflow.service;

import com.kent.aiflow.workflow.dto.TaskActionDto;
import com.kent.aiflow.workflow.entity.ApprovalTaskEntity;
import com.kent.aiflow.workflow.entity.WorkflowRequestEntity;
import com.kent.aiflow.workflow.enums.TaskStatus;
import com.kent.aiflow.workflow.enums.WorkflowStatus;
import com.kent.aiflow.workflow.mapper.ApprovalTaskMapper;
import com.kent.aiflow.workflow.mapper.WorkflowRequestMapper;
import com.kent.aiflow.workflow.vo.PendingTaskVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ApprovalTaskService {

    private final ApprovalTaskMapper approvalTaskMapper;
    private final WorkflowRequestMapper workflowRequestMapper;

    public List<PendingTaskVO> listPending() {
        return approvalTaskMapper.selectPendingTasks();
    }

    public void approve(Long taskId, TaskActionDto dto) {
        ApprovalTaskEntity task = approvalTaskMapper.selectById(taskId);
        task.setTaskStatus(TaskStatus.APPROVED);
        task.setComment(dto.getComment());
        task.setActionBy(dto.getActionBy());
        task.setActionTime(LocalDateTime.now());
        approvalTaskMapper.updateById(task);

        WorkflowRequestEntity workflow = workflowRequestMapper.selectById(task.getWorkflowRequestId());
        workflow.setStatus(WorkflowStatus.APPROVED);
        workflowRequestMapper.updateById(workflow);
    }

    public void reject(Long taskId, TaskActionDto dto) {
        ApprovalTaskEntity task = approvalTaskMapper.selectById(taskId);
        task.setTaskStatus(TaskStatus.REJECTED);
        task.setComment(dto.getComment());
        task.setActionBy(dto.getActionBy());
        task.setActionTime(LocalDateTime.now());
        approvalTaskMapper.updateById(task);

        WorkflowRequestEntity workflow = workflowRequestMapper.selectById(task.getWorkflowRequestId());
        workflow.setStatus(WorkflowStatus.REJECTED);
        workflowRequestMapper.updateById(workflow);
    }
}
