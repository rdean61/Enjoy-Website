package com.example.demo.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller 
public class SinglePageRoutingController {
    @RequestMapping(value = "/{path:^(?!api|static|favicon\\.ico|.*\\..*$).*}")
    public String spaForwarding() {
        return "forward://index.html";
    }
}
