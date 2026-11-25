package com.undec.fisica2.controller;

import com.undec.fisica2.service.CatedraPdfService;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/pdfs")
public class CatedraPdfController {

    private final CatedraPdfService pdfService;

    public CatedraPdfController(CatedraPdfService pdfService) {
        this.pdfService = pdfService;
    }

    @GetMapping
    public ResponseEntity<List<CatedraPdfService.PdfMetadataDto>> listPdfs() {
        return ResponseEntity.ok(pdfService.listAvailablePdfs());
    }

    @GetMapping("/{filename}/inspect")
    public ResponseEntity<Map<String, Object>> inspectPdf(
            @PathVariable String filename,
            @RequestParam(defaultValue = "20") int maxPages
    ) throws IOException {
        return ResponseEntity.ok(pdfService.inspectPdfPages(filename, maxPages));
    }

    @GetMapping("/{filename}/raw")
    public ResponseEntity<Resource> downloadRawPdf(@PathVariable String filename) {
        File docFile = pdfService.getPdfFile(filename);
        Resource resource = new FileSystemResource(docFile);
        boolean isDocx = docFile.getName().toLowerCase().endsWith(".docx");
        MediaType mediaType = isDocx
                ? MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.wordprocessingml.document")
                : MediaType.APPLICATION_PDF;
        String disposition = (isDocx ? "attachment" : "inline") + "; filename=\"" + docFile.getName() + "\"";
        return ResponseEntity.ok()
                .contentType(mediaType)
                .header(HttpHeaders.CONTENT_DISPOSITION, disposition)
                .body(resource);
    }

    @PostMapping("/upload")
    public ResponseEntity<Map<String, Object>> uploadPdf(@RequestParam("file") MultipartFile file) throws IOException {
        return ResponseEntity.ok(pdfService.saveAndInspectUploadedPdf(file));
    }
}
