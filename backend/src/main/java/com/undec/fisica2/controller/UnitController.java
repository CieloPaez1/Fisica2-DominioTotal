package com.undec.fisica2.controller;

import com.undec.fisica2.model.ProgramUnitEntity;
import com.undec.fisica2.service.MasteryEngineService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/units")
public class UnitController {

    private final MasteryEngineService masteryService;

    public UnitController(MasteryEngineService masteryService) {
        this.masteryService = masteryService;
    }

    @GetMapping
    public ResponseEntity<List<ProgramUnitEntity>> getAllUnits() {
        return ResponseEntity.ok(masteryService.getAllUnits());
    }

    @GetMapping("/{unitNumber}")
    public ResponseEntity<ProgramUnitEntity> getUnit(@PathVariable Integer unitNumber) {
        return ResponseEntity.ok(masteryService.getUnitByNumber(unitNumber));
    }

    @PostMapping("/{unitNumber}/boost")
    public ResponseEntity<ProgramUnitEntity> boostProgress(
            @PathVariable Integer unitNumber,
            @RequestBody Map<String, Object> body
    ) {
        String stage = (String) body.getOrDefault("stage", "practico");
        int amount = ((Number) body.getOrDefault("amount", 25)).intValue();
        return ResponseEntity.ok(masteryService.boostStageProgress(unitNumber, stage, amount));
    }

    @PostMapping("/{unitNumber}/penalty")
    public ResponseEntity<ProgramUnitEntity> applyPenalty(@PathVariable Integer unitNumber) {
        return ResponseEntity.ok(masteryService.applyInstabilityPenalty(unitNumber));
    }

    @PostMapping("/reset")
    public ResponseEntity<Map<String, String>> resetAll() {
        masteryService.resetAllProgressToZero();
        return ResponseEntity.ok(Map.of("message", "Progreso reiniciado a 0% exitosamente"));
    }
}
