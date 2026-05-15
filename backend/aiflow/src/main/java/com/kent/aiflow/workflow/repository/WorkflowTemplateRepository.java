package com.kent.aiflow.workflow.repository;

import com.kent.aiflow.workflow.entity.WorkflowTemplateEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkflowTemplateRepository extends JpaRepository<WorkflowTemplateEntity, Long> {
}