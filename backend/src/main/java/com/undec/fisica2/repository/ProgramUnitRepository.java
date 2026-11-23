package com.undec.fisica2.repository;

import com.undec.fisica2.model.ProgramUnitEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProgramUnitRepository extends JpaRepository<ProgramUnitEntity, Integer> {
    List<ProgramUnitEntity> findAllByOrderByUnitNumberAsc();
}
