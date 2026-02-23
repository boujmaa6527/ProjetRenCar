package fms.RentCar.service.customer;


import fms.RentCar.dto.CarDto;
import fms.RentCar.dto.ReserveRequest;
import fms.RentCar.entity.Car;
import fms.RentCar.entity.Reservation;
import fms.RentCar.entity.User;
import fms.RentCar.repository.CarRepository;
import fms.RentCar.repository.ReservationRepository;
import fms.RentCar.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl  implements  CustomerService{

    private  final CarRepository carRepository;
    private  final UserRepository userRepository;
    private  final ReservationRepository reservationRepository;

    @Override
    public List<CarDto> getAllCars() {
        return carRepository.findAll().stream().map(Car::getCarDto).collect(Collectors.toList());
    }

    @Override
    public void reserveCar(Long carId, ReserveRequest reserveRequest, String username) {
        Car car = carRepository.findById(carId)
                .orElseThrow(() -> new RuntimeException("Car Not Found"));
        User user = userRepository.findFirstByEmail(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Reservation reservation = new Reservation();

        reservation.setCar(car);
        reservation.setUser(user);
        reservation.setStartDate(reserveRequest.getStartDate());
        reservation.setEndDate(reserveRequest.getEndDate());

        reservationRepository.save(reservation);
    }
}
