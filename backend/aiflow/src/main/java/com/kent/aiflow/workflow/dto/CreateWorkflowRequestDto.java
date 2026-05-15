package com.kent.aiflow.workflow.dto;

import lombok.Data;

@Data
public class CreateWorkflowRequestDto {
    private String title;
    private String content;
    private Long requesterId;
    private Long templateId;
}