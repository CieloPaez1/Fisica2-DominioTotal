package com.undec.fisica2.service;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.xml.parsers.DocumentBuilderFactory;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.*;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;

@Service
public class CatedraPdfService {

    @Value("${catedra.pdf.directory:C:/Users/Cielo/Documents/fisica2}")
    private String pdfDirectoryPath;

    public record PdfMetadataDto(
            String filename,
            long sizeBytes,
            long sizeKB,
            int pageCount,
            String category,
            List<Integer> unitNumbers,
            String description
    ) {}

    public List<PdfMetadataDto> listAvailablePdfs() {
        File dir = new File(pdfDirectoryPath);
        if (!dir.exists() || !dir.isDirectory()) {
            return Collections.emptyList();
        }

        File[] files = dir.listFiles((d, name) -> {
            String lower = name.toLowerCase();
            return lower.endsWith(".pdf") || lower.endsWith(".docx");
        });
        if (files == null) return Collections.emptyList();

        Arrays.sort(files, Comparator.comparing(File::getName));

        List<PdfMetadataDto> result = new ArrayList<>();
        for (File f : files) {
            String name = f.getName();
            long sizeKB = Math.max(1, f.length() / 1024);
            result.add(new PdfMetadataDto(
                    name,
                    f.length(),
                    sizeKB,
                    0,
                    inferCategory(name),
                    inferUnits(name),
                    inferDescription(name)
            ));
        }
        return result;
    }

    public File getPdfFile(String filename) {
        // Prevent path traversal
        String safeName = new File(filename).getName();
        File pdfFile = new File(pdfDirectoryPath, safeName);
        if (!pdfFile.exists() || !pdfFile.isFile()) {
            throw new IllegalArgumentException("Archivo PDF no encontrado: " + safeName);
        }
        return pdfFile;
    }

    public Map<String, Object> inspectPdfPages(String filename, int maxPages) throws IOException {
        File docFile = getPdfFile(filename);
        if (docFile.getName().toLowerCase().endsWith(".docx")) {
            return inspectDocxPages(docFile, maxPages);
        }

        try (PDDocument document = Loader.loadPDF(docFile)) {
            int totalPages = document.getNumberOfPages();
            PDFTextStripper stripper = new PDFTextStripper();

            List<String> pagesText = new ArrayList<>();
            int pagesToExtract = Math.min(totalPages, maxPages);

            for (int p = 1; p <= pagesToExtract; p++) {
                stripper.setStartPage(p);
                stripper.setEndPage(p);
                String text = stripper.getText(document).trim();
                pagesText.add(text.isEmpty() ? "[Página con diagramas o esquemas gráficos de cátedra]" : text);
            }

            Map<String, Object> response = new HashMap<>();
            response.put("filename", docFile.getName());
            response.put("totalPages", totalPages);
            response.put("extractedPagesCount", pagesText.size());
            response.put("unitNumbers", inferUnits(docFile.getName()));
            response.put("category", inferCategory(docFile.getName()));
            response.put("pages", pagesText);
            return response;
        }
    }

    private Map<String, Object> inspectDocxPages(File docxFile, int maxPages) throws IOException {
        List<String> paragraphs = new ArrayList<>();
        try (ZipFile zip = new ZipFile(docxFile)) {
            ZipEntry entry = zip.getEntry("word/document.xml");
            if (entry != null) {
                try (InputStream is = zip.getInputStream(entry)) {
                    DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
                    dbf.setNamespaceAware(true);
                    var doc = dbf.newDocumentBuilder().parse(is);
                    var pNodes = doc.getElementsByTagNameNS("*", "p");
                    for (int i = 0; i < pNodes.getLength(); i++) {
                        String text = pNodes.item(i).getTextContent();
                        if (text != null && !text.trim().isEmpty()) {
                            paragraphs.add(text.trim());
                        }
                    }
                } catch (Exception e) {
                    throw new IOException("Error al leer el documento Word (.docx): " + e.getMessage(), e);
                }
            }
        }

        int parasPerPage = 32;
        List<String> allPages = new ArrayList<>();
        for (int i = 0; i < paragraphs.size(); i += parasPerPage) {
            int end = Math.min(i + parasPerPage, paragraphs.size());
            allPages.add(String.join("\n\n", paragraphs.subList(i, end)));
        }
        if (allPages.isEmpty()) {
            allPages.add("[Documento Word sin texto extraíble]");
        }

        int totalPages = allPages.size();
        int pagesToExtract = Math.min(totalPages, maxPages);
        List<String> pagesText = allPages.subList(0, pagesToExtract);

        Map<String, Object> response = new HashMap<>();
        response.put("filename", docxFile.getName());
        response.put("totalPages", totalPages);
        response.put("extractedPagesCount", pagesText.size());
        response.put("unitNumbers", inferUnits(docxFile.getName()));
        response.put("category", inferCategory(docxFile.getName()));
        response.put("pages", pagesText);
        return response;
    }

    public Map<String, Object> saveAndInspectUploadedPdf(MultipartFile file) throws IOException {
        if (file.isEmpty() || file.getOriginalFilename() == null) {
            throw new IllegalArgumentException("El archivo subido está vacío.");
        }
        String safeName = new File(file.getOriginalFilename()).getName();
        String lower = safeName.toLowerCase();
        if (!lower.endsWith(".pdf") && !lower.endsWith(".docx")) {
            throw new IllegalArgumentException("Solo se permiten archivos con extensión .pdf o .docx");
        }
        File dir = new File(pdfDirectoryPath);
        if (!dir.exists()) {
            dir.mkdirs();
        }
        Path target = dir.toPath().resolve(safeName);
        Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);
        return inspectPdfPages(safeName, 20);
    }

    private String inferCategory(String name) {
        String lower = name.toLowerCase();
        if (lower.contains("programa") || lower.contains("2025-2013")) return "programa";
        if (lower.contains("tp") || lower.contains("trabajo")) return "tp";
        if (lower.contains("unidad") || lower.contains("electro") || lower.contains("magnet")) return "teoria";
        if (lower.contains("resumen") || lower.contains("formula")) return "resumen";
        return "teoria";
    }

    private List<Integer> inferUnits(String name) {
        String lower = name.toLowerCase();
        if (lower.contains("03-electrostatica")) return List.of(1, 2, 3);
        if (lower.contains("04-electrodinamica")) return List.of(4, 5);
        if (lower.contains("05-magnetismo")) return List.of(6, 7);
        if (lower.contains("06-electromagnetismo")) return List.of(8, 9);
        if (lower.contains("unidad 2") || lower.contains("tp n°2") || lower.contains("tp n° 2")) return List.of(2);
        if (lower.contains("unidad 8")) return List.of(8);
        if (lower.contains("unidad 9")) return List.of(9);
        if (lower.contains("tp n°1") || lower.contains("tp n° 1")) return List.of(1);
        if (lower.contains("tp n°3") || lower.contains("tp n° 3")) return List.of(3);
        if (lower.contains("tp n°4") || lower.contains("tp n° 4")) return List.of(4);
        if (lower.contains("tp n°5") || lower.contains("tp n° 5")) return List.of(5);
        if (lower.contains("tp n°6") || lower.contains("tp n° 6")) return List.of(6, 7);
        if (lower.contains("tp n°7") || lower.contains("tp n° 7")) return List.of(8);
        return List.of(1, 2, 3, 4, 5, 6, 7, 8, 9);
    }

    private String inferDescription(String name) {
        String lower = name.toLowerCase();
        if (lower.contains("fisica2.docx")) return "Apunte Maestro Completo en Word (.docx): teoría profunda, demostraciones paso a paso y 22 gráficos de Unidades 1 a 9.";
        if (lower.contains("2025-2013")) return "Programa Analítico Oficial UNdeC — Unidades 1 a 9 y régimen de evaluación final.";
        if (lower.contains("03-electrostatica")) return "Apunte Oficial Cátedra UNdeC: Carga Eléctrica, Coulomb, Campo Eléctrico, Ley de Gauss y Potencial.";
        if (lower.contains("04-electrodinamica")) return "Apunte Oficial Cátedra UNdeC: Capacitores, Dieléctricos, Corriente Continua y Circuitos RC.";
        if (lower.contains("05-magnetismo")) return "Apunte Oficial Cátedra UNdeC: Fuerza Magnética de Lorentz, Efecto Hall, Biot-Savart y Ley de Ampère.";
        if (lower.contains("06-electromagnetismo")) return "Apunte Oficial Cátedra UNdeC: Inducción de Faraday-Lenz, Autoinductancia, Corriente Alterna y Maxwell.";
        if (lower.contains("tp")) return "Guía de Trabajos Prácticos de la Cátedra con ejercicios resueltos y propuestos para examen.";
        return "Documento Académico Oficial de la Cátedra de Física 2 (UNdeC).";
    }
}
