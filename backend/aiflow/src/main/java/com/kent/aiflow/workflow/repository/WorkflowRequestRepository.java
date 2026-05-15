package com.kent.aiflow.workflow.repository;

import com.kent.aiflow.workflow.entity.WorkflowRequestEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkflowRequestRepository extends JpaRepository<WorkflowRequestEntity, Long> {
}