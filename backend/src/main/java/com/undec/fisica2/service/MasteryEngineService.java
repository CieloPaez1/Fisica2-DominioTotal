package com.undec.fisica2.service;

import com.undec.fisica2.model.ProgramUnitEntity;
import com.undec.fisica2.repository.ProgramUnitRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class MasteryEngineService {

    private final ProgramUnitRepository unitRepository;

    public MasteryEngineService(ProgramUnitRepository unitRepository) {
        this.unitRepository = unitRepository;
    }

    @PostConstruct
    @Transactional
    public void seedInitialUnitsIfEmpty() {
        if (unitRepository.count() == 0) {
            unitRepository.saveAll(List.of(
                new ProgramUnitEntity(1, "Unidad 1: Carga Eléctrica y Campo Eléctrico", "Ley de Coulomb, distribuciones continuas e integrales de dE", "1er Parcial", "gauss"),
                new ProgramUnitEntity(2, "Unidad 2: Ley de Gauss", "Flujo eléctrico, superficies cerradas, cilindros, planos y conductores", "1er Parcial", "gauss"),
                new ProgramUnitEntity(3, "Unidad 3: Potencial Eléctrico y Energía", "Diferencia de potencial, gradiente E = -grad V y superficies equipotenciales", "1er Parcial", "gauss"),
                new ProgramUnitEntity(4, "Unidad 4: Capacidad y Dieléctricos", "Condensadores planos, esféricos, energía electrostática y polarización", "1er Parcial", "capacitores"),
                new ProgramUnitEntity(5, "Unidad 5: Corriente Eléctrica y Circuitos de CC", "Leyes de Kirchhoff, transitorios RC y potencia disipada por Joule", "1er Parcial", "rc_kirchhoff"),
                new ProgramUnitEntity(6, "Unidad 6: Campo Magnético y Fuerza de Lorentz", "Fuerza sobre cargas en movimiento q(v x B), ciclotrón y efecto Hall", "2do Parcial", "magnetismo"),
                new ProgramUnitEntity(7, "Unidad 7: Fuentes de Campo Magnético", "Ley de Biot-Savart, Ley de Ampère, solenoide y toroide", "2do Parcial", "magnetismo"),
                new ProgramUnitEntity(8, "Unidad 8: Inducción Electromagnética y Faraday-Lenz", "fem inducida, signo de Lenz, autoinductancia y circuitos RL", "2do Parcial", "faraday_lenz"),
                new ProgramUnitEntity(9, "Unidad 9: Corriente Alterna y Ecuaciones de Maxwell", "Fasores, impedancia RLC, resonancia, corriente de desplazamiento y Poynting", "2do Parcial", "rlc_fasores")
            ));
        }
    }

    public List<ProgramUnitEntity> getAllUnits() {
        return unitRepository.findAllByOrderByUnitNumberAsc();
    }

    public ProgramUnitEntity getUnitByNumber(Integer unitNumber) {
        return unitRepository.findById(unitNumber)
                .orElseThrow(() -> new IllegalArgumentException("Unidad no encontrada: " + unitNumber));
    }

    @Transactional
    public ProgramUnitEntity boostStageProgress(Integer unitNumber, String stage, int amount) {
        ProgramUnitEntity unit = getUnitByNumber(unitNumber);

        switch (stage.toLowerCase()) {
            case "teoria" -> unit.setProgressTeoria(Math.min(100, unit.getProgressTeoria() + amount));
            case "laboratorio" -> unit.setProgressLaboratorio(Math.min(100, unit.getProgressLaboratorio() + amount));
            case "practico" -> unit.setProgressPractico(Math.min(100, unit.getProgressPractico() + amount));
            case "pruebadominio", "mcq", "oral" -> unit.setProgressPruebaDominio(Math.min(100, unit.getProgressPruebaDominio() + amount));
            default -> throw new IllegalArgumentException("Etapa no reconocida: " + stage);
        }

        // Certificación académica UNdeC
        if (unit.getProgressTeoria() == 100 &&
            unit.getProgressLaboratorio() == 100 &&
            unit.getProgressPractico() == 100 &&
            unit.getProgressPruebaDominio() == 100) {
            unit.setCertificationStatus("certificado");
        } else if (unit.calculateMasteryPercentage() > 0) {
            unit.setCertificationStatus("en_progreso");
        }

        return unitRepository.save(unit);
    }

    @Transactional
    public ProgramUnitEntity applyInstabilityPenalty(Integer unitNumber) {
        ProgramUnitEntity unit = getUnitByNumber(unitNumber);
        unit.setProgressPruebaDominio(Math.min(80, (int)(unit.getProgressPruebaDominio() * 0.8)));
        unit.setCertificationStatus("inestable");
        return unitRepository.save(unit);
    }

    @Transactional
    public void resetAllProgressToZero() {
        List<ProgramUnitEntity> units = unitRepository.findAll();
        for (ProgramUnitEntity u : units) {
            u.setProgressTeoria(0);
            u.setProgressLaboratorio(0);
            u.setProgressPractico(0);
            u.setProgressPruebaDominio(0);
            u.setCertificationStatus("no_iniciada");
        }
        unitRepository.saveAll(units);
    }
}
