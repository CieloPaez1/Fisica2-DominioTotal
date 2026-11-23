package com.undec.fisica2.repository;

import com.undec.fisica2.model.StudentErrorEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentErrorRepository extends JpaRepository<StudentErrorEntity, Long> {
    List<StudentErrorEntity> findByResolvedFalseOrderByCreatedAtDesc();
    List<StudentErrorEntity> findByUnitNumberOrderByCreatedAtDesc(Integer unitNumber);
    Optional<StudentErrorEntity> findByUnitNumberAndCategoryAndTopicTitle(
            Integer unitNumber, String category, String topicTitle
    );
}
