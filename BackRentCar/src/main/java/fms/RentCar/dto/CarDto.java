package fms.RentCar.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@Data
@RequiredArgsConstructor
public class CarDto {

    private long id;

    private String modele;

    private Long kilometrage;

    private String couleur;

    private Long prix;

    private String marque;

    private String annee;

    private MultipartFile image;

    private String returnedImage;

    public CarDto(String annee, String couleur, Long kilometrage, String marque, String modele, Long prix, MultipartFile image) {
        this.modele = modele;
        this.kilometrage = kilometrage;
        this.marque = marque;
        this.couleur = couleur;
        this.annee = annee;
        this.prix = prix;
        this.image = image;


    }
}
