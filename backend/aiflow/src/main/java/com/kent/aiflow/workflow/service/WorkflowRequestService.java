package com.kent.aiflow.workflow.service;

import com.kent.aiflow.workflow.dto.CreateWorkflowRequestDto;
import com.kent.aiflow.workflow.entity.ApprovalTaskEntity;
import com.kent.aiflow.workflow.entity.WorkflowRequestEntity;
import com.kent.aiflow.workflow.enums.TaskStatus;
import com.kent.aiflow.workflow.enums.WorkflowStatus;
import com.kent.aiflow.workflow.mapper.ApprovalTaskMapper;
import com.kent.aiflow.workflow.mapper.WorkflowRequestMapper;
import com.kent.aiflow.workflow.vo.WorkflowRequestVO;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WorkflowRequestService {

    private final WorkflowRequestMapper workflowRequestMapper;
    private final ApprovalTaskMapper approvalTaskMapper;

    public WorkflowRequestEntity create(CreateWorkflowRequestDto dto) {

        WorkflowRequestEntity entity = new WorkflowRequestEntity();
        entity.setTitle(dto.getTitle());
        entity.setContent(dto.getContent());
        entity.setRequesterId(dto.getRequesterId());
        entity.setTemplateId(dto.getTemplateId());
        entity.setStatus(WorkflowStatus.PENDING);
        entity.setCreatedAt(LocalDateTime.now());

        workflowRequestMapper.insert(entity);

        return entity;
    }

    public void submit(Long workflowId) {
        WorkflowRequestEntity workflow = workflowRequestMapper.selectById(workflowId);
        workflow.setStatus(WorkflowStatus.PENDING);
        workflowRequestMapper.updateById(workflow);

        ApprovalTaskEntity task = new ApprovalTaskEntity();
        task.setWorkflowRequestId(workflowId);
        task.setApproverId(2L);
        task.setTaskStatus(TaskStatus.PENDING);
        task.setCreatedAt(LocalDateTime.now());

        approvalTaskMapper.insert(task);
    }

    public List<WorkflowRequestVO> list() {
        return workflowRequestMapper.selectWorkflowList();
    }

    public WorkflowRequestEntity detail(Long id) {
        return workflowRequestMapper.selectById(id);
    }
}