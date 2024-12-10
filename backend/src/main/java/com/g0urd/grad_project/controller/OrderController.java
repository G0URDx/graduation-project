package com.g0urd.grad_project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.g0urd.grad_project.models.Order;
import com.g0urd.grad_project.service.OrderService.OrderService;

@CrossOrigin(maxAge = 3360)
@RestController
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping("/api/v1/order")
    public ResponseEntity<List<Order>> fetchAllOrders() {
        return ResponseEntity.ok(orderService.fetchAllOrders());
    }

    @PostMapping("/api/v1/order")
    public ResponseEntity<Order> createOrder(
            @RequestBody Order order) {
        return ResponseEntity.ok(orderService.createOrder(order));
    }

    @PutMapping("/api/v1/order/{id}")
    public ResponseEntity<Order> updateOrder(
            @PathVariable("id") Long id,
            @RequestBody Order order) {
        return ResponseEntity.ok(orderService.updateOrder(order));
    }

    @DeleteMapping("/api/v1/order/{id}")
    public ResponseEntity<Boolean> deleteOrder(@PathVariable("id") Long id) {
        return ResponseEntity.ok(orderService.deleteOrder(id));
    }

}
