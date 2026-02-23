package fms.RentCar.controller;


import fms.RentCar.dto.CarDto;
import fms.RentCar.dto.ReserveRequest;
import fms.RentCar.service.customer.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customer")
@RequiredArgsConstructor
public class CustomerController {


    private final CustomerService customerService;

    @GetMapping("/cars")
    public ResponseEntity<List<CarDto>> getAllCars(){
        List<CarDto> carDtoList = customerService.getAllCars();
        return ResponseEntity.ok(carDtoList);
    }

    @PostMapping("/reserver/{carId}")
    public ResponseEntity<String> reserveCar (
            @PathVariable Long carId,
            @RequestBody ReserveRequest request,
            Authentication authentication
            ) {
        if(authentication == null){
          return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated");
        }
        String username = authentication.getName();
        customerService.reserveCar(carId, request,username);
        return ResponseEntity.ok("Réservation effectué avec success");
    }
}
