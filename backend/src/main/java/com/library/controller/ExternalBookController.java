package com.library.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/external-books")
@CrossOrigin(origins = "${frontend.url}")
public class ExternalBookController {

    @Value("${itbook.api.url}")
    private String itbookApiUrl;

    @Value("${bible.api.url}")
    private String bibleApiUrl;

    private final RestTemplate restTemplate;

    public ExternalBookController(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchBooks(
            @RequestParam String query,
            @RequestParam(defaultValue = "1") int page) {
        String url = itbookApiUrl + "/search/" + query + "?page=" + page;
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        return ResponseEntity.ok(response.getBody());
    }

    @GetMapping("/bibles")
    public ResponseEntity<?> getBibleBooks() {
        ResponseEntity<String> response = restTemplate.getForEntity(bibleApiUrl, String.class);
        return ResponseEntity.ok(response.getBody());
    }
}