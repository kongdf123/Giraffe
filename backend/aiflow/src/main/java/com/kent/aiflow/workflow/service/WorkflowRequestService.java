package com.kent.aiflow.workflow.service;

import com.kent.aiflow.workflow.dto.CreateWorkflowRequestDto;
import com.kent.aiflow.workflow.entity.UserEntity;
import com.kent.aiflow.workflow.entity.WorkflowRequestEntity;
import com.kent.aiflow.workflow.entity.WorkflowTemplateEntity;
import com.kent.aiflow.workflow.enums.WorkflowStatus;
import com.kent.aiflow.workflow.mapper.WorkflowRequestMapper;
import com.kent.aiflow.workflow.repository.UserRepository;
import com.kent.aiflow.workflow.repository.WorkflowRequestRepository;
import com.kent.aiflow.workflow.repository.WorkflowTemplateRepository;
import com.kent.aiflow.workflow.vo.WorkflowRequestVO;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WorkflowRequestService {

    private final WorkflowRequestMapper workflowRequestMapper;

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

    public List<WorkflowRequestVO> list() {
        return workflowRequestMapper.selectWorkflowList();
    }

    public WorkflowRequestEntity detail(Long id) {
        return workflowRequestMapper.selectById(id);
    }
}