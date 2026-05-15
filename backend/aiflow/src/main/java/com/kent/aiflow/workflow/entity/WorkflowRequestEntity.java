package com.kent.aiflow.workflow.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.kent.aiflow.workflow.enums.WorkflowStatus;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@TableName("workflow_request")
public class WorkflowRequestEntity {

    @TableId(type = IdType.AUTO)
    private Long id;

    private String title;

    private String content;

    private WorkflowStatus status;

    private Long requesterId;

    private Long templateId;

    private LocalDateTime createdAt;
}