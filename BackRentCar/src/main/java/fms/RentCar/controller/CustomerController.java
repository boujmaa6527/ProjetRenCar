package fms.RentCar.controller;


import fms.RentCar.dto.CarDto;
import fms.RentCar.dto.ReserveRequest;
import fms.RentCar.service.customer.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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

//    @PostMapping("reserver/{carId}")
//    public ResponseEntity<String> reserveCar (@PathVariable Long carId, @RequestBody ReserveRequest request){
//        return "";
//    }
}
