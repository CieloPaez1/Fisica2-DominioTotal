package com.undec.fisica2.controller;

import com.undec.fisica2.service.SpeedDrillService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/speed-drill")
public class SpeedDrillController {

    private final SpeedDrillService speedDrillService;

    public SpeedDrillController(SpeedDrillService speedDrillService) {
        this.speedDrillService = speedDrillService;
    }

    @GetMapping("/round")
    public ResponseEntity<List<SpeedDrillService.SpeedDrillQuestion>> getRound(
            @RequestParam(defaultValue = "10") int count
    ) {
        return ResponseEntity.ok(speedDrillService.getRandomRound(count));
    }
}
