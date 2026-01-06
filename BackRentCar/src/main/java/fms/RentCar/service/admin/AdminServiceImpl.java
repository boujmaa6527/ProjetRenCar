package fms.RentCar.service.admin;

import fms.RentCar.dto.CarDto;
import fms.RentCar.entity.Car;
import fms.RentCar.repository.CarRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final CarRepository carRepository;
    private static final Logger logger = LoggerFactory.getLogger(AdminServiceImpl.class);

    @Override
    public boolean postCar(CarDto carDto) throws IOException {
        try {
            Car car = new Car();
            car.setAnnee(carDto.getAnnee());
            car.setCouleur(carDto.getCouleur());
            //Important To verify if getImage is present for no bug
            if (carDto.getImage() != null) {
                car.setImage(carDto.getImage().getBytes());
            }
            car.setKilometrage(carDto.getKilometrage());
            car.setMarque(carDto.getMarque());
            car.setModele(carDto.getModele());
            System.out.println("model: " + carDto.getModele());
            car.setPrix(carDto.getPrix());


            carRepository.save(car);
            return true;
        } catch (Exception e) {
            logger.info("erreur lors de l'enregistrement de la voiture", e);
            return false;
        }


    }

    @Override
    public List<CarDto> getAllCars() {
        return carRepository.findAll().stream().map(Car::getCarDto).collect(Collectors.toList());
    }

    @Override
    public void deleteCar(Long id) {
        carRepository.deleteById(id);
    }

    @Override
    public CarDto getCarById(Long id) {
        Optional<Car> optionalCar = carRepository.findById(id);
        return optionalCar.map(Car::getCarDto).orElse(null);
    }

    @Override
    public boolean updateCar(Long carId, CarDto carDto) throws IOException {
        return carRepository.findById(carId).map(car -> {
            if(carDto.getImage()!= null) {
                try {
                    car.setImage(carDto.getImage().getBytes());
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }

            car.setPrix(carDto.getPrix());
                car.setMarque(carDto.getMarque());
                car.setKilometrage(carDto.getKilometrage());
                car.setModele(carDto.getModele());
                car.setCouleur(carDto.getCouleur());
                car.setAnnee(carDto.getAnnee());
                carRepository.save(car);
                return true;
        }).orElse(false);
    }

}