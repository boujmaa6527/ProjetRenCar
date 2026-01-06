package fms.RentCar.controller;


import fms.RentCar.dto.CarDto;
import fms.RentCar.service.admin.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private  final AdminService adminService;

    @PostMapping(value ="/car", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<CarDto> postCar(@RequestParam("annee") String anneeStr,
                                         @RequestParam("couleur") String couleur,
                                         @RequestParam("kilometrage") Long kilometrage,
                                         @RequestParam("marque") String marque,
                                         @RequestParam("modele") String modele,
                                         @RequestParam("prix") Long prix,
                                         @RequestParam(value = "image", required = false) MultipartFile image) throws IOException {
        try{
            Date anneeDate = new SimpleDateFormat("yyyy").parse(anneeStr);
            String annee = new SimpleDateFormat("yyyy").format(anneeDate);
            boolean succes= adminService.postCar(new CarDto(annee, couleur, kilometrage, marque, modele, prix, image));
            if(succes){
                return ResponseEntity.status(HttpStatus.CREATED).build();

            }else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }

    }
    @GetMapping("/cars")
    public ResponseEntity<List<CarDto>> getAllcars(){
        return ResponseEntity.ok(adminService.getAllCars());
    }

    @DeleteMapping("car/{id}")
    public ResponseEntity<Void>  deleteCar(@PathVariable Long id){
        adminService.deleteCar(id);

        return ResponseEntity.ok(null);
    }

    @GetMapping("car/{id}")
    public ResponseEntity<CarDto> getCarById(@PathVariable Long id ){
        CarDto  carDto = adminService.getCarById(id);

        return  ResponseEntity.ok(carDto);
    }

    @PutMapping("car/{carId}")
    public ResponseEntity<Void> updateCar(@PathVariable Long carId, @ModelAttribute CarDto carDto) throws IOException {
       try {
           boolean success = adminService.updateCar(carId, carDto);
           if(success)return ResponseEntity.status(HttpStatus.OK).build();
           return ResponseEntity.status(HttpStatus.NOT_FOUND).build();

       } catch (Exception e) {
           return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
       }
    }

}
