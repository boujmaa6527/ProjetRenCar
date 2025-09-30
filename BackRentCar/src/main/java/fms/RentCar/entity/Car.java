package fms.RentCar.entity;

import fms.RentCar.dto.CarDto;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.security.core.userdetails.UserDetails;
import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Arrays;
import java.util.Base64;
import java.util.Date;

@Entity
@Table(name = "t_cars")
@Data
public class Car implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String annee;

    private String couleur;



    private Long kilometrage;

    private String marque;


    private String modele;


    private Long prix;
    @Lob
    private byte[] image;

    public CarDto getCarDto() {
        CarDto carDto = new CarDto();
        carDto.setId(id);
        carDto.setAnnee(annee);
        carDto.setModele(modele);
        carDto.setKilometrage(kilometrage);
        carDto.setCouleur(couleur);
        carDto.setMarque(marque);
        carDto.setPrix(prix);
        carDto.setReturnedImage(Base64.getEncoder().encodeToString(image));

        return carDto;
    }

}
