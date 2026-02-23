package fms.RentCar.service.customer;

import fms.RentCar.dto.CarDto;
import fms.RentCar.dto.ReserveRequest;

import java.util.List;

public interface CustomerService {


    List<CarDto> getAllCars();

    void reserveCar(Long carId, ReserveRequest reserveRequest, String username);

}
