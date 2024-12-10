package com.g0urd.grad_project.service.OrderService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.g0urd.grad_project.models.Order;
import com.g0urd.grad_project.repository.OrderRepository;

@Service
public class OrderServiceImplementation implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Override
    public List<Order> fetchAllOrders() {
        return (List<Order>) orderRepository.findAll();
    }

    @Override
    public Order findById(Long id) {
        return orderRepository.findById(id).get();
    }

    @Override
    public Order createOrder(Order order) {
        return orderRepository.save(order);
    }

    @SuppressWarnings("null")
    @Override
    public Order updateOrder(Order order) {
        Order orderObject = orderRepository.findById(order.getId_order()).get();
        if (orderObject != null) {
            orderObject.setClient(order.getClient());
            orderObject.setTransportationOffer(order.getTransportationOffer());
            orderObject.setId_client_order(order.getId_client_order());
            orderObject.setFreight_order(order.getFreight_order());
            orderObject.setAccount_currency_order(order.getAccount_currency_order());
            orderObject.setPayment_currency_order(order.getPayment_currency_order());
            orderObject.setDescription_order(order.getDescription_order());
        }
        return orderRepository.save(orderObject);
    }

    @Override
    public Boolean deleteOrder(Long id) {
        Order orderObject = orderRepository.findById(id).get();
        if (orderObject != null) {
            orderRepository.delete(orderObject);
            return true;
        }
        return false;
    }

}
