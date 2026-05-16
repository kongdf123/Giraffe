package com.kent.aiflow.workflow.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.kent.aiflow.workflow.enums.TaskStatus;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@TableName("approval_task")
public class ApprovalTaskEntity {

    @TableId(type = IdType.AUTO)
    private Long id;

    private Long workflowRequestId;

    private Long approverId;

    private TaskStatus taskStatus;

    private String comment;

    private String actionBy;
    private LocalDateTime actionTime;

    private LocalDateTime createdAt;
}