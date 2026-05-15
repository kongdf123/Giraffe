package com.kent.aiflow.workflow.vo;

import lombok.Data;

@Data
public class WorkflowRequestVO {
    private Long id;
    private String title;
    private String requesterName;
    private String templateName;
    private String status;
}