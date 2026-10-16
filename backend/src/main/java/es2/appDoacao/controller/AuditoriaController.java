package es2.appDoacao.controller;

import es2.appDoacao.security.CurrentUserService;
import es2.appDoacao.service.AuditoriaService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuditoriaController {
    private final AuditoriaService auditoriaService;
    private final CurrentUserService currentUserService;

    public AuditoriaController(AuditoriaService auditoriaService, CurrentUserService currentUserService) {
        this.auditoriaService = auditoriaService;
        this.currentUserService = currentUserService;
    }

    @GetMapping("/auditoria")
    public Object listar() {
        return auditoriaService.listar(currentUserService.requireUser());
    }
}
