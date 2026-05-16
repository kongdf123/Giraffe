package com.kent.aiflow.workflow.controller;

import com.kent.aiflow.workflow.dto.CreateWorkflowRequestDto;
import com.kent.aiflow.workflow.entity.WorkflowRequestEntity;
import com.kent.aiflow.workflow.service.WorkflowRequestService;
import com.kent.aiflow.workflow.vo.WorkflowRequestVO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workflows")
@RequiredArgsConstructor
@CrossOrigin
public class WorkflowRequestController {

    private final WorkflowRequestService workflowRequestService;
    @PostMapping("/{id}/submit")
    public void submit(@PathVariable Long id) {
        workflowRequestService.submit(id);
    }

    @PostMapping
    public WorkflowRequestEntity create(@RequestBody CreateWorkflowRequestDto dto) {
        return workflowRequestService.create(dto);
    }

    @GetMapping
    public List<WorkflowRequestVO> list() {
        return workflowRequestService.list();
    }

    @GetMapping("/{id}")
    public WorkflowRequestEntity detail(@PathVariable Long id) {
        return workflowRequestService.detail(id);
    }
}