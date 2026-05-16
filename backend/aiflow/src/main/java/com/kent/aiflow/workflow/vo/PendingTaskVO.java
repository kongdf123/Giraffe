package com.kent.aiflow.workflow.vo;

import lombok.Data;

@Data
public class PendingTaskVO {

    private Long taskId;

    private Long workflowId;

    private String workflowTitle;

    private String requesterName;

    private String taskStatus;

    private String createdAt;
}