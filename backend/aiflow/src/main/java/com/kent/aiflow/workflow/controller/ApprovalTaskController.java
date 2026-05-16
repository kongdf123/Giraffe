package com.kent.aiflow.workflow.controller;

import com.kent.aiflow.workflow.dto.TaskActionDto;
import com.kent.aiflow.workflow.service.ApprovalTaskService;
import com.kent.aiflow.workflow.vo.PendingTaskVO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
@CrossOrigin
public class ApprovalTaskController {

    private final ApprovalTaskService approvalTaskService;

    @GetMapping("/pending")
    public List<PendingTaskVO> pending() {
        return approvalTaskService.listPending();
    }

    @PostMapping("/{id}/approve")
    public void approve(@PathVariable Long id, @RequestBody TaskActionDto dto) {
        approvalTaskService.approve(id, dto);
    }

    @PostMapping("/{id}/reject")
    public void reject(@PathVariable Long id, @RequestBody TaskActionDto dto) {
        approvalTaskService.reject(id, dto);
    }
}
