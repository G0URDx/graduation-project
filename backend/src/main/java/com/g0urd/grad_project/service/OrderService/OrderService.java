package com.g0urd.grad_project.service.OrderService;

import java.util.List;

import com.g0urd.grad_project.models.Order;

public interface OrderService {

    List<Order> fetchAllOrders();

    Order findById(Long id);

    Order createOrder(Order order);

    Order updateOrder(Order order);

    Boolean deleteOrder(Long id);

}
